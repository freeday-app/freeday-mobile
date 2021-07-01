import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '../../helpers/auth.js';
import Login from '../views/login.js';
import Home from '../views/home.js';
import Daysoff from '../views/daysoff.js';
import Settings from '../views/settings.js';

const Tab = createBottomTabNavigator();

export default function Router() {
    const { authData } = useAuth();
    return (
        authData ? (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Home">
                    <Tab.Screen
                        name="Home"
                        component={Home}
                        options={{
                            // eslint-disable-next-line react/prop-types
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="home" size={size} color={color} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Daysoff"
                        component={Daysoff}
                        options={{
                            // eslint-disable-next-line react/prop-types
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="calendar" size={size} color={color} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            // eslint-disable-next-line react/prop-types
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="cog" size={size} color={color} />
                            )
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        ) : (
            <Login />
        )
    );
}
