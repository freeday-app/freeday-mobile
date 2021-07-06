import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        paddingBottom: 210,
        width: '100%'
    },
    loading: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
    },
    content: {
        height: '100%',
        width: '100%'
    },
    headerTitle: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10
    },
    headerTitleLogo: {
        width: 25,
        height: 25
    },
    headerTitleText: {
        fontSize: 20,
        marginLeft: 10
    }
});
