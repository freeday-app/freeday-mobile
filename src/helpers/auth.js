import React, { createContext, useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authData, setAuthData] = useState(null);
    const login = async (username, password) => {
        try {
            const token = `TOKEN-${username}-${password}`;
            const userId = `ID-${username}-${password}`;
            await SecureStore.setItemAsync('token', token);
            setAuthData({
                userId,
                username,
                token
            });
        } catch (err) {
            await SecureStore.deleteItemAsync('token');
            setAuthData(null);
        }
    };
    const logout = async () => {
        await SecureStore.deleteItemAsync('token');
        setAuthData(null);
    };
    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
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
