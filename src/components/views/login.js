import React, { useState } from 'react';
import {
    Button,
    TextInput,
    View,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        height: 50,
        borderWidth: 1,
        width: 200
    }
});

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
                autoCompleteType="username"
                textContentType="username"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                autoCompleteType="password"
                textContentType="password"
                secureTextEntry
            />
            <Button
                onPress={() => null}
                title="Login"
                accessibilityLabel="Submit login form"
            />
        </View>
    );
}
