import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../atoms/button.js';
import Input from '../atoms/input.js';

import { useAuth } from '../../helpers/auth.js';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const { login } = useAuth();
    return (
        <View style={styles.container}>
            <Input
                type="text"
                value={username}
                onChange={(text) => setUsername(text)}
            />
            <Input
                type="password"
                value={password}
                onChange={(text) => setPassword(text)}
            />
            <Button
                text="Login"
                accessibility="Submit login form"
                onPress={() => {
                    login(username, password);
                }}
            />
        </View>
    );
}
