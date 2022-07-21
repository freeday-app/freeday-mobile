import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import { ToastProvider } from './components/contexts/toast.js';
import { AuthProvider } from './components/contexts/auth.js';
import { ThemeProvider } from './components/contexts/theme.js';
import { LanguageProvider } from './components/contexts/language.js';
import Router from './components/organisms/router.js';

function App() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <ToastProvider>
                        <AuthProvider>
                            <AuthProvider>
                                <Router />
                            </AuthProvider>
                        </AuthProvider>
                    </ToastProvider>
                </NavigationContainer>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default registerRootComponent(App);
