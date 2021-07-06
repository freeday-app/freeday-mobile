import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Switch } from 'react-native-paper';

import Page from '../organisms/page.js';
import { useAuth } from '../contexts/auth.js';
import { useTheme } from '../contexts/theme.js';
import { useLanguage } from '../contexts/language.js';
import Select from '../atoms/select.js';
import Form from '../molecules/form.js';

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
                <Form.Container>
                    <Form.Group inline>
                        <Form.Label>
                            {getText('settings.darkTheme')}
                        </Form.Label>
                        <Form.Input>
                            <Switch
                                value={theme === 'dark'}
                                onValueChange={toggleDarkTheme}
                            />
                        </Form.Input>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {getText('language.title')}
                        </Form.Label>
                        <Form.Input>
                            <Select
                                items={Object.values(languageData)}
                                selectedItems={[languageData[language]]}
                                onSelect={(items) => {
                                    setLanguage(items[0].id);
                                }}
                            />
                        </Form.Input>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {getText('auth.logout')}
                        </Form.Label>
                        <Form.Input>
                            <Button
                                mode="contained"
                                onPress={() => logout()}
                            >
                                {getText('auth.logout')}
                            </Button>
                        </Form.Input>
                    </Form.Group>
                </Form.Container>
            </ScrollView>
        </Page>
    );
}
