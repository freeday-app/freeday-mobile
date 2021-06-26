import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});

export default function Daysoff() {
    return (
        <View style={styles.container}>
            <Text>daysoff</Text>
        </View>
    );
}
