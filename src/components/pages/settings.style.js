import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 20
    },
    row: {
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lastBox: {
        flexGrow: 1,
        marginLeft: 15
    },
    logoutButton: {
        marginVertical: 30
    }
});
