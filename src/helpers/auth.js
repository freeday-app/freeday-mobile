import React, {
    useContext,
    useEffect,
    useReducer,
    createContext
} from 'react';
import SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';

const AuthContext = createContext({
    isAuth: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {}
});

const authReducer = async (state, { type, token, userId }) => {
    switch (type) {
        case 'login':
            await SecureStore.setItemAsync('token', token);
            await SecureStore.setItemAsync('userId', userId);
            return {
                ...state,
                isAuth: true,
                token,
                userId
            };
        case 'logout':
        default:
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('userId');
            return {
                ...state,
                isAuth: false,
                token: null,
                userId: null
            };
    }
};

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        isAuth: false,
        userId: null,
        token: null
    });
    useEffect(() => {
        const initState = async () => {
            try {
                const token = await SecureStore.getItemAsync('token');
                const userId = await SecureStore.getItemAsync('userId');
                if (token && userId) {
                    dispatch({
                        type: 'login',
                        userId,
                        token
                    });
                } else {
                    dispatch({
                        type: 'logout'
                    });
                }
            } catch {
                dispatch({
                    type: 'logout'
                });
            }
        };
        initState();
    }, [state, dispatch]);
    const actions = React.useMemo(
        () => ({
            login: async (/* { username, password } */) => {
                try {
                    // TODO perform auth
                    const token = 'XXXXXXXXXX';
                    const userId = 'XXXXXXXXXX';
                    dispatch({
                        type: 'login',
                        userId,
                        token
                    });
                } catch (err) {
                    dispatch({
                        type: 'logout'
                    });
                }
            },
            logout: () => dispatch({
                type: 'logout'
            })
        }),
        [state, dispatch]
    );

    return (
        <AuthContext.Provider value={{ ...state, ...actions }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export const useAuth = () => (
    useContext(AuthContext)
);
