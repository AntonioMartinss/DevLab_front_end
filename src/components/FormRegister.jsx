import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';


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

        httpConfig({data: formData}, "POST");
    };

    useEffect(() => {
        if (response) {
            if (response.status === 201) {
                setMessage(response.data);
                setName('');
                setEmail('');
                setPassword('');
                setInputErrors({ usuario: false, email: false, senha: false });
                switchToLogin();
            } else if (response.status === 409 || response.status === 400) {
                setMessage(response.data);

                if (response.data === "Usuário Inválido" || response.data === "Usuário é obrigatório") {
                    setInputErrors({ usuario: true, email: false, senha: false });
                } if (response.data === "Email inválido") {
                    setInputErrors({ usuario: false, email: true, senha: false });
                }
                if (response.data === "Senha é obrigatório") {
                    setInputErrors({ usuario: false, email: true, senha: true });
                }
                
            } else if (response.status === 422) {
                setMessage(response.data);
                setInputErrors({ usuario: true, email: false, senha: false });
                
            }
        }
    }, [response]);

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-4 text-white">Cadastre-se!</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className={`w-full h-10 p-2 border ${inputErrors.usuario ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-mid-night`}
                    type="text"
                    required
                    name="usuario"
                    value={usuario}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Usuário"
                />
                <input
                    className={`w-full h-10 p-2 border ${inputErrors.email ? 'border-red-500' : 'border-gray-300'}  rounded-md focus:outline-none focus:ring-2 focus:ring-mid-night`}
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                />
                <input
                    className={`w-full h-10 p-2 border ${inputErrors.senha ? 'border-red-500' : 'border-gray-300'}  rounded-md focus:outline-none focus:ring-2 focus:ring-mid-night`}
                    type="password"
                    required
                    name="senha"
                    minLength={8}
                    value={senha}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
                <input className="w-full h-10 p-2 bg-white cursor-pointer hover:bg-indigo-950 hover:text-white transition-all" type="submit" value="Entrar" />
            </form>

            {message && <p className='pt-2 text-sm'>{message}</p>}

            <button onClick={switchToLogin} className="mt-4 text-white hover:underline text-center">Já tem uma conta?</button>
        </div>
    );
};

export default FormRegister;
