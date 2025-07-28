import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        try {

            const response = await fetch('http://localhost:8080/DevLab/usuario/logado', {
                method: 'GET',
                headers: {
                    'Authorization': sessionStorage.getItem("token")

                }
            });
            
            if (response.status === 200) {
                 const data = await response.text();
                
                    setIsAuthenticated(true);
            } else if (response.status === 401 || response.status === 403) {
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
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
