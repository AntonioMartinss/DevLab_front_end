import { useState, useEffect } from 'react';

import { useFetch } from '../hooks/useFetch';



const FormRegister = ({ switchToLogin }) => {

    const url = "http://localhost:8080/Freela/usuario/cadastro";

    const [usuario, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');

    const { data, httpConfig } = useFetch(url)

    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = {
            usuario,
            email,
            senha
        };

        httpConfig(formData, "POST")

        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="">
            <h1 className="text-3xl font-semibold mb-4 text-white">Cadastre-se!</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mid-night"
                    type="text"
                    name="usuario"
                    value={usuario}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Usuário"
                />
                <input className="w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mid-night" type="email" name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}placeholder="E-mail"/>

                <input className="w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mid-night" type="password" name="senha" value={senha}
                onChange={(e) => setPassword(e.target.value)} placeholder="Senha"/>
                
                <input className="w-full h-10 p-2 bg-blue-600 cursor-pointer" type="submit" value="Entrar"/>
            </form>
            <button onClick={switchToLogin} className="mt-4 text-blue-400 hover:underline text-center">Já tem uma conta?</button>
        </div>
    );
};

export default FormRegister;
