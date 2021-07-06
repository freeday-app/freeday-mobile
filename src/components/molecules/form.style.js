import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    form: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%'
    },
    group: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    groupCenter: {
        justifyContent: 'center'
    },
    groupRow: {
        justifyContent: 'center'
    },
    groupBlock: {
        width: '100%'
    },
    groupInline: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    label: {
        marginVertical: 10
    },
    labelBlock: {
        width: '100%'
    },
    labelInline: {
        flexGrow: 1
    },
    labelText: {
        fontSize: 15
    },
    input: {
        textAlign: 'left'
    },
    inputBlock: {
        width: '100%'
    },
    inputInline: {
        //
    }
});
