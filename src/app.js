import React from 'react';
import { registerRootComponent } from 'expo';

import { AuthProvider } from './components/contexts/auth.js';
import Router from './components/organisms/router.js';

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}

export default registerRootComponent(App);
