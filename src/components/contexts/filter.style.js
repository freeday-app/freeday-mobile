import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        width: '100%'
    },
    modalContent: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        padding: 25,
        width: '100%'
    },
    scrollContainer: {
        flexGrow: 1,
        width: '100%'
    },
    submitButton: {
        marginTop: 10,
        width: '100%'
    }
});
