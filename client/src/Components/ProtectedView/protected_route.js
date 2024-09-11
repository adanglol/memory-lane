import React from 'react';
import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthProvider';
import { useAuth } from '../Auth/AuthProvider';


const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
  
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  
  export default ProtectedRoute;
