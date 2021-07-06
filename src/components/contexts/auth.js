import React, {
    createContext,
    useState,
    useContext,
    useEffect
} from 'react';
import * as SecureStore from 'expo-secure-store';

import { useToast } from './toast.js';
import API from '../../helpers/api.js';
import Types from '../../helpers/types.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [authData, setAuthData] = useState(null);
    const { showToast } = useToast();
    const logout = async () => {
        await SecureStore.deleteItemAsync('tenant');
        await SecureStore.deleteItemAsync('token');
        setAuthData(null);
        setLoading(false);
    };
    const login = async (tenant, username, password) => {
        try {
            const { userId, token } = await API.call({
                tenant,
                method: 'POST',
                route: '/api/auth',
                body: {
                    username,
                    password
                }
            });
            API.tenant = tenant;
            API.token = token;
            await SecureStore.setItemAsync('tenant', tenant);
            await SecureStore.setItemAsync('token', token);
            setAuthData({
                userId,
                token
            });
        } catch (err) {
            await logout();
            showToast('Authentication failed');
        }
    };
    const initAuth = async () => {
        try {
            const tenant = await SecureStore.getItemAsync('tenant');
            const token = await SecureStore.getItemAsync('token');
            API.tenant = tenant;
            API.token = token;
            const auth = await API.call({
                method: 'GET',
                route: '/api/auth'
            });
            setLoading(false);
            setAuthData({
                userId: auth.userId,
                token: auth.token
            });
        } catch (err) {
            await logout();
        }
    };
    useEffect(() => {
        initAuth();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                loading,
                authData,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: Types.children.isRequired
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
