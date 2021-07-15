import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    surface: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        elevation: 10,
        flexDirection: 'row',
        padding: 10
    },
    surfaceRaw: {
        elevation: 0
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
