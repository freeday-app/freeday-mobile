import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import FreedayLogo from '../../assets/freeday-logo.png';
import { useAuth } from '../contexts/auth.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10
    },
    titleLogo: {
        width: 50,
        height: 50
    },
    titleText: {
        fontSize: 35,
        marginLeft: 10
    },
    input: {
        margin: 10
    },
    button: {
        margin: 10
    }
});

export default function Login() {
    const [username, setUsername] = useState('yoann.legrand');
    const [password, setPassword] = useState('alacon');
    const { login } = useAuth();
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Image source={FreedayLogo} style={styles.titleLogo} />
                <Text style={styles.titleText}>Freeday</Text>
            </View>
            <TextInput
                label="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
            />
            <Button
                icon="login"
                mode="contained"
                onPress={() => {
                    login('beta', username, password);
                }}
                style={styles.button}
            >
                Login
            </Button>
        </View>
    );
}
