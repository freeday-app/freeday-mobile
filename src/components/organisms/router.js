import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme as usePaperTheme } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/auth.js';
import Login from '../pages/login.js';
import Home from '../pages/home.js';
import Daysoff from '../pages/daysoff.js';
import Settings from '../pages/settings.js';
import { useLanguage } from '../contexts/language.js';
import { useTheme } from '../contexts/theme.js';

const Tab = createMaterialBottomTabNavigator();

export default function Router() {
    const { authData } = useAuth();
    const { getText } = useLanguage();
    const { colors } = usePaperTheme();
    const { themeData } = useTheme();

    const tabBarIconHome = ({ color }) => (
        <FontAwesome name="home" size={24} color={color} />
    );
    const tabBarIconDaysoff = ({ color }) => (
        <MaterialCommunityIcons name="palm-tree" size={24} color={color} />
    );
    const tabBarIconSettings = ({ color }) => (
        <Ionicons name="settings-sharp" size={24} color={color} />
    );

    return (
        authData ? (
            <NavigationContainer theme={themeData}>
                <Tab.Navigator
                    tabBarOptions={{
                        showLabel: false
                    }}
                    barStyle={{
                        backgroundColor: colors.navBar
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={Home}
                        options={{
                            tabBarLabel: getText('home.title'),
                            tabBarIcon: tabBarIconHome
                        }}
                    />
                    <Tab.Screen
                        name="Daysoff"
                        component={Daysoff}
                        options={{
                            tabBarLabel: getText('daysoff.title'),
                            tabBarIcon: tabBarIconDaysoff
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            tabBarLabel: getText('settings.title'),
                            tabBarIcon: tabBarIconSettings
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        ) : (
            <Login />
        )
    );
}
