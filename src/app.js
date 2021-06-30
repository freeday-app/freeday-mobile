import React from 'react';
import { registerRootComponent } from 'expo';

import { AuthProvider } from './helpers/auth.js';
import Router from './helpers/router.js';

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}

export default registerRootComponent(App);
