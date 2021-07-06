import React from 'react';
import { registerRootComponent } from 'expo';

import { ToastProvider } from './components/contexts/toast.js';
import { AuthProvider } from './components/contexts/auth.js';
import { ThemeProvider } from './components/contexts/theme.js';
import Router from './components/organisms/router.js';

function App() {
    return (
        <ThemeProvider>
            <ToastProvider>
                <AuthProvider>
                    <AuthProvider>
                        <Router />
                    </AuthProvider>
                </AuthProvider>
            </ToastProvider>
        </ThemeProvider>
    );
}

export default registerRootComponent(App);
