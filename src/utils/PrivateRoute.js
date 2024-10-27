import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLogoutMutation, useRefreshTokenMutation } from '../services/authApi';
import {jwtDecode} from 'jwt-decode';
import { useGetUserByIdQuery } from '../services/userApi';

// Function to check if the user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

// Function to check if the token is about to expire
const isTokenAboutToExpire = (token) => {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        const expTime = decoded.exp * 1000; // Convert expiration time to milliseconds
        const currentTime = Date.now();
        return expTime - currentTime < 5 * 60 * 1000; // Check if expiring in less than 5 minutes
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};

const PrivateRoute = ({ element: Element, ...rest }) => {
    const [refreshToken, { isLoading }] = useRefreshTokenMutation();
    const [logout] = useLogoutMutation();
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [redirect, setRedirect] = useState(null);
    const token = localStorage.getItem('token');
    const refreshTokenData = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    const location = useLocation(); 

    const decoded = token ? jwtDecode(token) : null;
    const { data } = useGetUserByIdQuery(decoded?.userId, { skip: !decoded });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if(token === undefined || token === null) {
                    await logout(userId);
                    localStorage.clear();
                    setRedirect('/auth');
                } else if (token && data?.data?.userData?.deviceLoginCount === 0) {
                    await logout(userId);
                    localStorage.clear();
                    setRedirect('/auth');
                } else if (location?.pathname === "/" && isAuthenticated()) {
                    setRedirect("/home");
                } else if (!isAuthenticated()) {
                    setRedirect('/auth');
                } else if (isTokenAboutToExpire(token) && refreshTokenData) {
                    const result = await refreshToken({ refreshToken: refreshTokenData }).unwrap();
                    localStorage.setItem('token', result?.response?.token);

                if (result.error) {
                    localStorage.clear();
                    setRedirect('/auth');
                }
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.clear();
                setRedirect('/auth');
            } finally {
                setIsLoadingAuth(false);
            }
        };

        checkAuth();
    }, [refreshToken, token, data, location]);

    if (isLoading || isLoadingAuth) {
        return <div>Loading...</div>;
    }

    if (redirect) {
        return <Navigate to={redirect} replace />;
    }

    return Element;
};

export default PrivateRoute;
