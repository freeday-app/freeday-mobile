import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Emoji from 'react-native-emoji';

// import { useAuth } from '../contexts/auth.js';
import { useToast } from '../contexts/toast.js';
import Page from '../organisms/page.js';
import API from '../../helpers/api.js';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center'
    },
    welcomeText: {
        fontSize: 30
    },
    welcomeEmoji: {
        fontSize: 50
    }
});

export default function Home() {
    // const { authData: { userId } } = useAuth();
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
        <Page loading={loading}>
            <View style={styles.container}>
                <Emoji name="wave" style={styles.welcomeEmoji} />
                <Text style={styles.welcomeText}>
                    {`Welcome ${user ? user.username : ''} !`}
                </Text>
            </View>
        </Page>
    );
}
