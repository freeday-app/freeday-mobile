import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Page from '../organisms/page.js';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});

export default function Settings() {
    return (
        <Page>
            <Text>settings</Text>
        </Page>
    );
}
