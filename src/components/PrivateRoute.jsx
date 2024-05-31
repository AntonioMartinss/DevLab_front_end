import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {

        try {

            const response = await fetch('http://localhost:8080/Freela/usuario/logado', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
    
            if (response.status === 200) {
                const data = await response.json();
                if (data === "Usuário Logado") {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } else if (response.status === 401) {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
        
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>; // Ou qualquer outro indicador de carregamento
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
