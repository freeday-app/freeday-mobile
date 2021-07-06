import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%'
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        width: '100%'
    },
    modalContent: {
        backgroundColor: 'white',
        flexGrow: 1,
        padding: 25,
        width: '100%'
    },
    modalScroll: {
        flexGrow: 1
    },
    selectedItems: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10
    },
    selectedItem: {
        marginHorizontal: 5,
        marginVertical: 2
    },
    submitButton: {
        marginTop: 10
    }
});
