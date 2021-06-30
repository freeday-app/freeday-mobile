import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useAuth } from './auth.js';
import Login from '../components/views/login.js';
import Home from '../components/views/home.js';
import Daysoff from '../components/views/daysoff.js';

const Drawer = createDrawerNavigator();

export default function Router() {
    const { authData } = useAuth();
    return (
        authData ? (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Daysoff" component={Daysoff} />
                </Drawer.Navigator>
            </NavigationContainer>
        ) : (
            <Login />
        )
    );
}
