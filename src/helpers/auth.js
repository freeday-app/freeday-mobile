import React, { createContext, useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';

import API from './api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authData, setAuthData] = useState(null);
    const logout = async () => {
        await SecureStore.deleteItemAsync('tenant');
        await SecureStore.deleteItemAsync('token');
        setAuthData(null);
    };
    const login = async (tenant, username, password) => {
        try {
            API.tenant = tenant;
            const { userId, token } = await API.call({
                method: 'POST',
                route: '/api/auth',
                body: {
                    username,
                    password
                }
            });
            await SecureStore.setItemAsync('tenant', tenant);
            await SecureStore.setItemAsync('token', token);
            setAuthData({
                userId,
                token
            });
        } catch (err) {
            await logout();
        }
    };
    const check = async () => {
        try {
            await API.call({
                method: 'GET',
                route: '/api/auth'
            });
        } catch (err) {
            await logout();
        }
    };
    return (
        <AuthContext.Provider
            value={{
                authData,
                login,
                logout,
                check
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
