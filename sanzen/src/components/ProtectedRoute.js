// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(GlobalContext);
    const location = useLocation();

    if (!user) {
        // Redirect to login page while saving the attempted URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;