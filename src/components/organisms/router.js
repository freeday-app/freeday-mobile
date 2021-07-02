import React from 'react';
import { BottomNavigation } from 'react-native-paper';

import { useAuth } from '../contexts/auth.js';
import Login from '../views/login.js';
import Home from '../views/home.js';
import Daysoff from '../views/daysoff.js';
import Settings from '../views/settings.js';

export default function Router() {
    const { authData } = useAuth();
    const [index, setIndex] = React.useState(0);
    const routes = [
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'daysoff', title: 'Daysoff', icon: 'palm-tree' },
        { key: 'settings', title: 'Settings', icon: 'cog' }
    ];
    const renderScene = BottomNavigation.SceneMap({
        home: () => <Home />,
        daysoff: () => <Daysoff />,
        settings: () => <Settings />
    });
    return (
        authData ? (
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        ) : (
            <Login />
        )
    );
}
