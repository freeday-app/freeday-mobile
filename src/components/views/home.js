import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAuth } from '../../helpers/auth.js';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});

export default function Home() {
    const { authData } = useAuth();
    return (
        <View style={styles.container}>
            <Text>{`Welcome ${authData.userId}`}</Text>
        </View>
    );
}
