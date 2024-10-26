import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        const expTime = decoded.exp * 1000; // Convert expiration time to milliseconds
        return Date.now() < expTime; // Check if token is still valid
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};

const AuthenticateRoute = ({ element: Element }) => {
    const [redirect, setRedirect] = useState(null);
    const location = useLocation();
    const token = localStorage.getItem('token');
    const privateRoutes = ['/my-courses', '/settings', '/profile', '/help', '/home', '/'];

    useEffect(() => {
        const onAuthPageOrNonPrivateRoute = location.pathname === '/auth' || !privateRoutes.includes(location.pathname);
        if (onAuthPageOrNonPrivateRoute && isAuthenticated() && isTokenValid(token)) {
            setRedirect('/home');
        }
    }, [location, token]);

    if (redirect) {
        return <Navigate to={redirect} replace />;
    }

    return Element;
};

export default AuthenticateRoute;
