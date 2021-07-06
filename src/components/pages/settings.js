import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Switch } from 'react-native-paper';

import Page from '../organisms/page.js';
import { useAuth } from '../contexts/auth.js';
import { useTheme } from '../contexts/theme.js';
import Form from '../molecules/form.js';

import styles from './settings.style.js';

export default function Settings() {
    const { logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const toggleDarkTheme = () => setTheme(
        theme === 'dark' ? 'light' : 'dark'
    );
    return (
        <Page header>
            <ScrollView style={styles.container}>
                <Form.Container>
                    <Form.Group inline>
                        <Form.Label>Dark theme</Form.Label>
                        <Form.Input>
                            <Switch
                                value={theme === 'dark'}
                                onValueChange={toggleDarkTheme}
                            />
                        </Form.Input>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Logout</Form.Label>
                        <Form.Input>
                            <Button
                                mode="contained"
                                onPress={() => logout()}
                            >
                                Logout
                            </Button>
                        </Form.Input>
                    </Form.Group>
                </Form.Container>
            </ScrollView>
        </Page>
    );
}
