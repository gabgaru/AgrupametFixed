import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteDash = ({ children, user}) => {
    return user ? children : <Navigate to="/"></Navigate>;
};

export const ProtectedRouteMenu = ({ children, user}) => {
    return user ? children : <Navigate to="/"></Navigate>;
};

export const ProtectedRouteAgrupacion = ({ children, user}) => {
    return user ? children : <Navigate to="/"></Navigate>;
};

export const ProtectedRoutePerfil = ({ children, user}) => {
    return user ? children : <Navigate to="/"></Navigate>;
};

export const ProtectedRouteDonaciones = ({ children, user}) => {
    return user ? children : <Navigate to="/"></Navigate>;
};


