import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useMemo
} from 'react';
import {
    Provider as PaperProvider,
    DefaultTheme,
    DarkTheme
} from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

import Types from '../../helpers/types.js';

const themes = {
    light: {
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: '#5A6DAF',
            accent: '#25367B',
            background: '#ffffff',
            surface: '#ffffff',
            text: '#000000',
            disabled: '#a1a1a1',
            placeholder: '#a1a1a1'
        }
    },
    dark: {
        ...DarkTheme,
        dark: true,
        colors: {
            ...DarkTheme.colors,
            primary: '#137cbd',
            accent: '#48aff0',
            background: '#333333',
            surface: '#4f4f4f',
            text: '#ffffff',
            disabled: '#cccccc',
            placeholder: '#cccccc'
        }
    }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [themeData, setThemeData] = useState(themes[theme]);
    const getStoredTheme = async () => {
        const storedTheme = await SecureStore.getItemAsync('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    };
    const storeTheme = async () => {
        await SecureStore.setItemAsync('theme', theme);
    };
    useEffect(() => {
        getStoredTheme();
    }, []);
    useEffect(() => {
        if (!themes[theme]) {
            throw new Error(`Invalid theme ${theme}`);
        }
        storeTheme();
        setThemeData(themes[theme]);
    }, [theme]);
    const contextValue = useMemo(() => ({
        theme,
        setTheme,
        themeData
    }), [
        theme,
        setTheme,
        themeData
    ]);
    return (
        <ThemeContext.Provider value={contextValue}>
            <PaperProvider theme={themeData}>
                {children}
            </PaperProvider>
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: Types.children.isRequired
};

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within an ThemeProvider');
    }
    return context;
}
