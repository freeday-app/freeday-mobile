import React, { useEffect } from 'react';
import { BottomNavigation } from 'react-native-paper';

import { useAuth } from '../contexts/auth.js';
import { useLanguage } from '../contexts/language.js';
import { FilterProvider } from '../contexts/filter.js';
import Login from '../pages/login.js';
import Home from '../pages/home.js';
import Daysoff from '../pages/daysoff.js';
import Settings from '../pages/settings.js';

export default function Router() {
    const { authData } = useAuth();
    const { getText } = useLanguage();
    const [index, setIndex] = React.useState(0);
    const routes = [{
        key: 'home',
        title: getText('home.title'),
        icon: 'home'
    }, {
        key: 'daysoff',
        title: getText('daysoff.title'),
        icon: 'palm-tree'
    }, {
        key: 'settings',
        title: getText('settings.title'),
        icon: 'cog'
    }];
    const renderScene = BottomNavigation.SceneMap({
        home: () => <Home />,
        daysoff: () => <Daysoff />,
        settings: () => <Settings />
    });
    useEffect(() => {
        setIndex(0);
    }, [authData]);
    return (
        authData ? (
            <FilterProvider>
                <BottomNavigation
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            </FilterProvider>
        ) : (
            <Login />
        )
    );
}
