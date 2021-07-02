import React from 'react';
import { Text } from 'react-native';

import { useAuth } from '../contexts/auth.js';
import Page from '../organisms/page.js';

export default function Home() {
    const { authData } = useAuth();
    return (
        <Page>
            <Text>{`Welcome ${authData.userId}`}</Text>
        </Page>
    );
}
