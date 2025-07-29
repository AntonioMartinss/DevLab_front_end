import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { typography } from "../assets/fonts/typography.js"

const FormRegister = ({ switchToLogin }) => {
  const url = "http://localhost:8080/DevLab/usuario/cadastro";

  const [usuario, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [inputErrors, setInputErrors] = useState({ usuario: false, email: false, senha: false });

  const { httpConfig, response } = useFetch(url);

  const encrypt = (data) => {
    const publicKeyPEM = `-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJLJPbG2Gw9A5RmEe4MdLkeYNBQADFVsMhNHdO0f3vvfFz+Pln3F857fUFHBFReJ9L0BlEDCRNRn+0g6cPpnx30CAwEAAQ==-----END PUBLIC KEY-----`;
    const publicKey = KEYUTIL.getKey(publicKeyPEM);
    const decryptedData = stringToArray(JSON.stringify(data));
    const encryptedData = [];

    decryptedData.forEach(element => {
      const encryptedHex = KJUR.crypto.Cipher.encrypt(element, publicKey);
      encryptedData.push(hextob64(encryptedHex));
    });

    return encryptedData;
  };

  function stringToArray(inputString) {
    let resultArray = [];
    let currentIndex = 0;
    let maxLength = 53;

    while (currentIndex < inputString.length) {
      let segment = inputString.slice(currentIndex, currentIndex + maxLength);
      resultArray.push(segment);
      currentIndex += maxLength;
    }

    return resultArray;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = encrypt({
      usuario,
      email,
      senha
    });

    httpConfig({ data: formData }, "POST");
  };

  useEffect(() => {
    if (response) {
      if (response.status === 201) {
        setMessage(response.data);
        setName('');
        setEmail('');
        setPassword('');
        setInputErrors({ usuario: false, email: false, senha: false });

        setTimeout(() => {
          setMessage(null);
          switchToLogin();
        }, 3000);
      } else if (response.status === 409 || response.status === 400) {
        setMessage(response.data);

        setInputErrors({
          usuario: response.data.includes("Usuário") ? true : false,
          email: response.data.includes("Email") ? true : false,
          senha: response.data.includes("Senha") ? true : false,
        });

        setTimeout(() => setMessage(null), 3000);

      } else if (response.status === 422) {
        setMessage(response.data);
        setInputErrors({ usuario: true, email: false, senha: false });

        setTimeout(() => setMessage(null), 3000);
      }
    }
  }, [response]);

  return (
    <div className="w-full max-w-sm">
      <h1 className={`${typography.forms.title} font-bold mb-6 text-text`}>
        Cadastre-se!
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className={`w-full h-10 px-3 bg-deep-black ${typography.forms.input} text-text placeholder:text-gray-400 border ${
            inputErrors.usuario ? 'border-red-500' : 'border-dark-slate-gray'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-blue`}
          type="text"
          name="usuario"
          value={usuario}
          onChange={(e) => setName(e.target.value)}
          placeholder="Usuário"
        />

        <input
          className={`w-full h-10 px-3 bg-deep-black ${typography.forms.input} text-text placeholder:text-gray-400 border ${
            inputErrors.email ? 'border-red-500' : 'border-dark-slate-gray'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-blue`}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />

        <input
          className={`w-full h-10 px-3 bg-deep-black ${typography.forms.input} text-text placeholder:text-gray-400 border ${
            inputErrors.senha ? 'border-red-500' : 'border-dark-slate-gray'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-blue`}
          type="password"
          name="senha"
          value={senha}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha (mínimo 8 caracteres)"
          minLength={8}
        />
        
        <input
          type="submit"
          value="Cadastrar"
          className={`w-full h-10 bg-sky-blue ${typography.forms.buttonPrimary} text-text-dark font-semibold rounded-md cursor-pointer hover:bg-opacity-90 transition`}
        />
      </form>

      {message && (
        <p className={`pt-4 text-red-400 ${typography.forms.error}`}>
          {message}
        </p>
      )}

      <button
        onClick={switchToLogin}
        className={`mt-6 text-sky-blue hover:underline ${typography.forms.linkSecondary}`}
      >
        Já tem uma conta?
      </button>
    </div>
  );
};

export default FormRegister;