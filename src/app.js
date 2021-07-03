import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';

import { ToastProvider } from './components/contexts/toast.js';
import { AuthProvider } from './components/contexts/auth.js';
import { FilterProvider } from './components/contexts/filter.js';
import Router from './components/organisms/router.js';

function App() {
    return (
        <PaperProvider>
            <ToastProvider>
                <AuthProvider>
                    <FilterProvider>
                        <Router />
                    </FilterProvider>
                </AuthProvider>
            </ToastProvider>
        </PaperProvider>
    );
}

export default registerRootComponent(App);
