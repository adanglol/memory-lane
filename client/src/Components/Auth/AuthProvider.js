// Where all the authentication logic is stored and can be accessed by the rest of the application

import React, { createContext, useContext, useEffect, useState} from 'react';
import api from './ApiConfig'
import { useNavigate } from 'react-router-dom';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const register = async(credentials) => {
        try {
            await api.post('/register',credentials);
            alert('Signup successful');
            navigate('/login');
        } catch(error) {
            console.error("Registration failed", error);
        }
    }

    // Login function - sends a POST request to the server with the user credentials
    const login = async(credentials) => {
        try {
            await api.post('/login',credentials,{withCredentials: true});
            setIsAuthenticated(true);
            console.log('Logged in successfully');
            navigate('/hub');

        }
        catch(error) {
            console.error("Login failed", error);
        }
    }

    // Logout function - sends a POST request to the server to logout
    const logout = async() => {
        try {
            await api.post('/logout');
            setIsAuthenticated(false);
        } catch(error) {
            console.error("Logout failed", error);
        }
    };
    const checkAuth = async() => {
        try {
            const response = await api.get('/check-auth', {withCredentials: true});
            setIsAuthenticated(response.data.isAuthenticated);
            if(response.data.isAuthenticated) {
                navigate('/hub');
            }
        } catch(error) {
            console.error("Check auth failed", error);
        }
    };

    // Check auth when component mounts
    useEffect(() => {
        checkAuth();
    },[]);


    
    return (
        <AuthContext.Provider value={{ isAuthenticated, logout,login,register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


