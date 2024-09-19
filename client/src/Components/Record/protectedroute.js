import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';



const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redirect them to the /login page if not logged in
        return <Navigate to="/login"/>;
    }

    return element;
};

export default PrivateRoute;
