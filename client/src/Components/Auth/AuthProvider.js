// Where all the authentication logic is stored and can be accessed by the rest of the application

import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token , setToken] = useState(null);

    // Check auth when component mounts
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    } ,[]);

    const login = (newToken) => {
        sessionStorage.setItem('token', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
    }

    const logout = () => {
        sessionStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, token,login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);