import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    surface: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        elevation: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    value: {
        flexGrow: 1
    }
});
