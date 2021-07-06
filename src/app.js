import React from 'react';
import { registerRootComponent } from 'expo';

import { ToastProvider } from './components/contexts/toast.js';
import { AuthProvider } from './components/contexts/auth.js';
import { ThemeProvider } from './components/contexts/theme.js';
import { LanguageProvider } from './components/contexts/language.js';
import Router from './components/organisms/router.js';

function App() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <ToastProvider>
                    <AuthProvider>
                        <AuthProvider>
                            <Router />
                        </AuthProvider>
                    </AuthProvider>
                </ToastProvider>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default registerRootComponent(App);
