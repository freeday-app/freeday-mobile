import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    surface: {
        alignItems: 'flex-start',
        borderRadius: 5,
        display: 'flex',
        elevation: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
        padding: 15
    },
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    marginBottom: {
        marginBottom: 15
    },
    avatar: {
        marginRight: 15
    },
    headInfo: {
        flexGrow: 1
    },
    username: {
        fontSize: 20
    },
    label: {
        fontSize: 14
    },
    value: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    reset: {
        //
    },
    actions: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    action: {
        marginLeft: 25
    }
});
