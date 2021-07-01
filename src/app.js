import React from 'react';
import { registerRootComponent } from 'expo';
import { RootSiblingParent } from 'react-native-root-siblings';

import { AuthProvider } from './helpers/auth.js';
import Router from './components/organisms/router.js';

function App() {
    return (
        <AuthProvider>
            <RootSiblingParent>
                <Router />
            </RootSiblingParent>
        </AuthProvider>
    );
}

export default registerRootComponent(App);
