import React, { useState } from 'react';
import { View, Image } from 'react-native';
import {
    TextInput,
    Button,
    Text,
    ActivityIndicator,
    withTheme
} from 'react-native-paper';

import FreedayLogo from '../../assets/logo.png';
import FreedayLogoDark from '../../assets/logo-dark.png';
import { useAuth } from '../contexts/auth.js';
import { useLanguage } from '../contexts/language.js';
import Types from '../../helpers/types.js';

import styles from './login.style.js';

function Login({ theme }) {
    const { dark, colors } = theme;
    const { baseUrl, loading, login } = useAuth();
    const [url, setUrl] = useState(baseUrl || 'https://');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { getText } = useLanguage();
    const togglePasswordVisibile = () => {
        setPasswordVisible(!passwordVisible);
    };
    if (loading) {
        return (
            <View
                style={{
                    ...styles.container,
                    backgroundColor: colors.background
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: colors.background
            }}
        >
            <View style={styles.title}>
                <Image
                    source={dark ? FreedayLogoDark : FreedayLogo}
                    style={styles.titleLogo}
                />
                <Text style={styles.titleText}>
                    Freeday
                </Text>
            </View>
            <TextInput
                mode="outlined"
                label={getText('auth.url')}
                value={url}
                autoCapitalize="none"
                onChangeText={(text) => setUrl(text)}
                style={styles.input}
            />
            <TextInput
                mode="outlined"
                label={getText('auth.username')}
                value={username}
                autoCapitalize="none"
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
            />
            <TextInput
                mode="outlined"
                label={getText('auth.password')}
                value={password}
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!passwordVisible}
                style={styles.input}
                right={(
                    <TextInput.Icon
                        name="eye"
                        onPress={() => togglePasswordVisibile()}
                    />
                )}
            />
            <Button
                mode="contained"
                onPress={() => {
                    login(url, username, password);
                }}
                style={styles.button}
            >
                {getText('auth.login')}
            </Button>
        </View>
    );
}

Login.propTypes = {
    theme: Types.theme.isRequired
};

export default withTheme(Login);
