import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hook to prevent unauthenticated users from accessing the Hub or other protected routes
const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);
}

export default useAuth;
