import React from 'react';
import { registerRootComponent } from 'expo';

import { ToastProvider } from './components/contexts/toast.js';
import { AuthProvider } from './components/contexts/auth.js';
import Router from './components/organisms/router.js';

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </ToastProvider>
    );
}

export default registerRootComponent(App);
