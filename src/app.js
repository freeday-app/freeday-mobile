import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { registerRootComponent } from 'expo';

import { AuthProvider, useAuth } from './helpers/auth.js';
import Login from './components/views/login.js';
import Home from './components/views/home.js';
import Daysoff from './components/views/daysoff.js';

const Drawer = createDrawerNavigator();

function App() {
    const { isAuth } = useAuth();
    return (
        <AuthProvider>
            {isAuth ? (
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home" component={Home} />
                        <Drawer.Screen name="Daysoff" component={Daysoff} />
                    </Drawer.Navigator>
                </NavigationContainer>
            ) : (
                <Login />
            )}
        </AuthProvider>
    );
}

export default registerRootComponent(App);
