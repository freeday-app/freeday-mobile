import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo
} from 'react';
import * as SecureStore from 'expo-secure-store';

import { useToast } from './toast.js';
import { useLanguage } from './language.js';
import API from '../../helpers/api.js';
import Types from '../../helpers/types.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [authData, setAuthData] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);
    const { showToast } = useToast();
    const { getText } = useLanguage();
    const logout = async () => {
        await SecureStore.deleteItemAsync('tenant');
        await SecureStore.deleteItemAsync('token');
        setAuthData(null);
        setLoading(false);
    };
    const login = async (url, username, password) => {
        try {
            const properUrl = API.parseUrl(url);
            const tenant = API.getTenant(properUrl);
            const { userId, token } = await API.call({
                baseUrl: properUrl,
                tenant,
                method: 'POST',
                route: '/api/auth',
                body: {
                    username,
                    password
                }
            });
            setBaseUrl(properUrl);
            API.baseUrl = properUrl;
            API.tenant = tenant;
            API.token = token;
            await SecureStore.setItemAsync('url', properUrl);
            await SecureStore.setItemAsync('tenant', tenant);
            await SecureStore.setItemAsync('token', token);
            setAuthData({
                userId,
                token
            });
        } catch (err) {
            await logout();
            showToast(getText('auth.error.login'));
        }
    };
    const initAuth = async () => {
        try {
            const url = await SecureStore.getItemAsync('url');
            const tenant = await SecureStore.getItemAsync('tenant');
            const token = await SecureStore.getItemAsync('token');
            setBaseUrl(url);
            API.baseUrl = url;
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
    const contextValue = useMemo(() => ({
        loading,
        baseUrl,
        authData,
        login,
        logout
    }), [
        loading,
        baseUrl,
        authData,
        login,
        logout
    ]);
    return (
        <AuthContext.Provider value={contextValue}>
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
