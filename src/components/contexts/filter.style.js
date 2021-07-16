import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%'
    },
    modalContent: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxHeight: '75%'
    },
    title: {
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 2
    },
    titleIcon: {
        marginRight: 10
    },
    titleText: {
        flexGrow: 1,
        fontSize: 20,
        fontWeight: 'bold'
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 15,
        width: '100%'
    },
    submitButton: {
        borderRadius: 0,
        marginTop: 10,
        padding: 5,
        width: '100%'
    }
});
