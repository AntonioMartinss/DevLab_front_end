import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { typography } from "../assets/fonts/typography.js"

const FormLogin = ({ switchToSignup }) => {
  const navigate = useNavigate();
  const url = "http://localhost:8080/DevLab/usuario/login";

  const [usuario, setName] = useState('');
  const [senha, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [inputErrors, setInputErrors] = useState({ usuario: false, senha: false });

  const { httpConfig, response, error } = useFetch(url);

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

    const formData = encrypt({ usuario, senha });
    httpConfig({ data: formData }, "POST");

    setName('');
    setPassword('');
  };

  useEffect(() => {
    if (response) {
      if (response.status === 200) {
        setMessage(response.data);
        setName('');
        setPassword('');
        setInputErrors({ usuario: false, senha: false });
        navigate('/biblioteca');
      } else if (response.status === 401 || response.status === 400) {
        setMessage(response.data);

        setInputErrors({
          usuario: response.data.includes("Login") ? true : false,
          senha: response.data.includes("Senha") ? true : false,
        });

        setTimeout(() => setMessage(null), 3000);
      }
    }
  }, [response, navigate]);

  return (
    <>
      <div className="w-full max-w-sm">
        <h1 className={`${typography.forms.title}  font-bold mb-6 text-text`}>Olá novamente!</h1>

        <form onSubmit={handleSubmit} className={`space-y-4 text-xs`}>
          <input
            className={`w-full h-10 px-3 bg-deep-black ${typography.forms.input && typography.forms.placeholder}  text-text placeholder:text-gray-400 border ${inputErrors.usuario ? 'border-red-500' : 'border-dark-slate-gray'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-blue`}
            type="text"
            name="usuario"
            value={usuario}
            onChange={(e) => setName(e.target.value)}
            placeholder="Usuário"
          />

          <input
            className={`w-full h-10 px-3 ${typography.forms.input && typography.forms.placeholder} bg-deep-black text-text placeholder:text-gray-400 placeholder:text-base border ${inputErrors.senha ? 'border-red-500' : 'border-dark-slate-gray'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-blue`}
            type="password"
            name="senha"
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />

          <input
            type="submit"
            value="Entrar"
            className={`w-full h-10 bg-sky-blue ${typography.forms.buttonPrimary} text-text-dark font-semibold rounded-md cursor-pointer hover:bg-opacity-90 transition`}
          />
        </form>

        {message && (
          <p className={` pt-4 text-red-400 ${typography.forms.error} }`}>{message}</p>
        )}

        <button
          onClick={switchToSignup}
          className={`mt-6 text-sky-blue hover:underline ${typography.forms.buttonSecondary}`}
        >
          Não tem uma conta?
        </button>
      </div>
    </>
  );
};

export default FormLogin;