import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    surface: {
        borderRadius: 10,
        elevation: 5
    },
    surfaceRaw: {
        elevation: 0
    },
    pressable: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        width: '100%'
    },
    leftIcon: {
        margin: 10
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 10
    },
    value: {
        fontSize: 50,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 20
    }
});
