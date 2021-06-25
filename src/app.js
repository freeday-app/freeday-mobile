import { registerRootComponent } from 'expo';
import React from 'react';

import Login from './components/views/login.js';

function App() {
    return (
        <Login />
    );
}

export default registerRootComponent(App);
