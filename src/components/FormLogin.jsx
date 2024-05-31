
import { useState, useEffect } from 'react';

import { useFetch } from '../hooks/useFetch';

import { useNavigate } from 'react-router-dom';


const FormLogin = ({ switchToSignup }) => {

    const navigate = useNavigate();

    const url = "http://localhost:8080/Freela/usuario/login"; 

    const [usuario, setName] = useState('');
    const [senha, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [inputErrors, setInputErrors] = useState({ usuario: false, senha: false });

     const {httpConfig, response, error} = useFetch(url)

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = {
            usuario,
            senha
        };

         httpConfig(formData, "POST")
         
        console.log(formData)
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
                navigate('/jogos');
            } else if (response.status === 401 || response.status === 400) {
                setMessage(response.data);

            if (response.data === "Login Feito com sucesso") {
                    setInputErrors({ usuario: true, senha: false });
                }
            if (response.data === "Senha é obrigatório") {
                    setInputErrors({ usuario: false, senha: true });
            }
            }
        }
    }, [response, navigate]);


    return (
        <>
            <div className="">
                <h1 className="text-3xl font-semibold mb-4 text-white">Olá novamente!</h1>
                <form onSubmit={handleSubmit} className="space-y-4  ">

                    <input className={`w-full h-10 p-2 border ${inputErrors.usuario ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-mid-night`} type="text" name="usuario" value={usuario}
                    onChange={(e) => setName(e.target.value)} required placeholder="Usuário" />

                    <input className={`w-full h-10 p-2 border ${inputErrors.senha ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-mid-night`} type="password" name="senha" value={senha}
                    onChange={(e) => setPassword(e.target.value)}  required placeholder="Senha" />
                    
                    <input  className="w-full h-10 p-2 bg-light-gray  cursor-pointer hover:bg-indigo-950 hover:text-white transition-all" type="submit" value="Entrar" />

                </form>
                {message && <p className='text-sm'>{message}</p>}
                <button onClick={switchToSignup} className="mt-4 text-white hover:underline text-center ">Não tem uma conta?</button>
            </div>
        </>
    )
}

export default FormLogin