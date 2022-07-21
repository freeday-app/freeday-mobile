import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { useAuth } from '../contexts/auth.js';
import { FilterProvider } from '../contexts/filter.js';
import Login from '../pages/login.js';
import Home from '../pages/home.js';
import Daysoff from '../pages/daysoff.js';
import Settings from '../pages/settings.js';
import { useLanguage } from '../contexts/language.js';

const Tab = createMaterialBottomTabNavigator();

export default function Router() {
    const { authData } = useAuth();
    const { getText } = useLanguage();
    const { colors } = useTheme();

    const tabBarIconHome = () => (<FontAwesome name="home" size={24} color="white" />);
    const tabBarIconDaysOff = () => (<MaterialCommunityIcons name="palm-tree" size={24} color="white" />);
    const tabBarIconSetting = () => (<Ionicons name="settings-sharp" size={24} color="white" />);

    return (
        authData ? (
            <FilterProvider>
                <Tab.Navigator
                    tabBarOptions={{
                        showLabel: false
                    }}
                    barStyle={{ backgroundColor: colors.primary }}
                >
                    <Tab.Screen
                        name={getText('home.title')}
                        component={Home}
                        options={{
                            tabBarIcon: tabBarIconHome
                        }}
                    />
                    <Tab.Screen
                        name={getText('daysoff.title')}
                        component={Daysoff}
                        options={{
                            tabBarIcon: tabBarIconDaysOff
                        }}
                    />
                    <Tab.Screen
                        name={getText('settings.title')}
                        component={Settings}
                        options={{
                            tabBarIcon: tabBarIconSetting
                        }}
                    />
                </Tab.Navigator>
            </FilterProvider>
        ) : (
            <Login />
        )
    );
}
