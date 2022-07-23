import React from 'react';
import { registerRootComponent } from 'expo';

import { ToastProvider } from './components/contexts/toast.js';
import { AuthProvider } from './components/contexts/auth.js';
import { ThemeProvider } from './components/contexts/theme.js';
import { LanguageProvider } from './components/contexts/language.js';
import Router from './components/organisms/router.js';
import { FilterProvider } from './components/contexts/filter.js';

function App() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <ToastProvider>
                    <AuthProvider>
                        <AuthProvider>
                            <FilterProvider>
                                <Router />
                            </FilterProvider>
                        </AuthProvider>
                    </AuthProvider>
                </ToastProvider>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default registerRootComponent(App);
