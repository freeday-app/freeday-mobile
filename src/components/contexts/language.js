import React, {
    useState,
    createContext,
    useContext,
    useEffect
} from 'react';
import * as SecureStore from 'expo-secure-store';

import Types from '../../helpers/types.js';
import fr from '../../languages/fr.js';
import en from '../../languages/en.js';

const languages = {
    fr,
    en
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('fr');
    const getStoredLanguage = async () => {
        const storedLanguage = await SecureStore.getItemAsync('language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    };
    const storeLanguage = async () => {
        await SecureStore.setItemAsync('language', language);
    };
    useEffect(() => {
        getStoredLanguage();
    }, []);
    useEffect(() => {
        if (!languages[language]) {
            throw new Error(`Invalid language ${language}`);
        }
        storeLanguage();
    }, [language]);
    const setArgs = (text, args) => {
        let replaced = text;
        for (const arg of args) {
            replaced = replaced.replace('%s', arg);
        }
        return replaced;
    };
    const getText = (fullKey, args = null, ucfirst = true) => {
        const error = `Error while getting text ${fullKey} with language ${language}`;
        let text = languages[language];
        const keys = fullKey.split('.');
        for (const key of keys) {
            if (!text[key]) {
                throw new Error(error);
            }
            text = text[key];
        }
        if (typeof text !== 'string') {
            throw new Error(error);
        }
        const rawText = ucfirst ? (
            text.charAt(0).toUpperCase() + text.slice(1)
        ) : text;
        if (args && Array.isArray(args) && args.length > 0) {
            return setArgs(rawText, args);
        }
        return rawText;
    };
    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                getText
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

LanguageProvider.propTypes = {
    children: Types.children.isRequired
};

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within an LanguageProvider');
    }
    return context;
}
