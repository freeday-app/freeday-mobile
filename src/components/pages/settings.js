import React from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Switch
} from 'react-native-paper';

import Page from '../organisms/page.js';
import { useAuth } from '../contexts/auth.js';
import { useTheme } from '../contexts/theme.js';
import { useLanguage } from '../contexts/language.js';
import Box from '../atoms/box.js';
import Select from '../atoms/select.js';
import Colors from '../../helpers/colors.js';

import styles from './settings.style.js';

export default function Settings() {
    const { logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const { language, setLanguage, getText } = useLanguage();
    const toggleDarkTheme = () => setTheme(
        theme === 'dark' ? 'light' : 'dark'
    );
    const languageData = {
        en: {
            id: 'en',
            name: getText('language.en'),
            emoji: 'flag-us'
        },
        fr: {
            id: 'fr',
            name: getText('language.fr'),
            emoji: 'flag-fr'
        }
    };
    return (
        <Page header>
            <ScrollView style={styles.container}>
                <View style={styles.row}>
                    <Box
                        color={Colors.blue}
                        label={getText('settings.darkTheme')}
                        content={(
                            <Switch
                                value={theme === 'dark'}
                                onValueChange={toggleDarkTheme}
                            />
                        )}
                    />
                    <Box
                        color={Colors.darkBlue}
                        label={getText('language.title')}
                        content={(
                            <Select
                                mode="contained"
                                items={Object.values(languageData)}
                                selectedItems={[languageData[language]]}
                                onSelect={(items) => {
                                    setLanguage(items[0].id);
                                }}
                            />
                        )}
                        style={styles.lastBox}
                    />
                </View>
                <Button
                    mode="outlined"
                    onPress={() => logout()}
                    icon="logout"
                    style={styles.logoutButton}
                >
                    {getText('auth.logout')}
                </Button>
            </ScrollView>
        </Page>
    );
}
