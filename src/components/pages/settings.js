import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

import Page from '../organisms/page.js';
import { useAuth } from '../contexts/auth.js';

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});

export default function Settings() {
    const { logout } = useAuth();
    return (
        <Page>
            <ScrollView style={styles.container}>
                <Button
                    mode="contained"
                    onPress={() => logout()}
                >
                    Logout
                </Button>
            </ScrollView>
        </Page>
    );
}
