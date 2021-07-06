import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Emoji from 'react-native-emoji';

import { useToast } from '../contexts/toast.js';
import Page from '../organisms/page.js';
import API from '../../helpers/api.js';

import styles from './home.style.js';

export default function Home() {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const getUser = async () => {
        try {
            const userData = await API.call({
                method: 'GET',
                route: '/api/users/me'
            });
            setUser(userData);
            setLoading(false);
        } catch (err) {
            showToast('Error while taking action on dayoff');
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <Page header loading={loading}>
            <View style={styles.container}>
                <Emoji name="wave" style={styles.welcomeEmoji} />
                <Text style={styles.welcomeText}>
                    {`Welcome ${user ? user.username : ''} !`}
                </Text>
            </View>
        </Page>
    );
}
