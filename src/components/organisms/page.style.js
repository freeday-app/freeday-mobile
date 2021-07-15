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
        width: 30,
        height: 30
    },
    headerTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    contentHeader: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    contentHeaderRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%'
    },
    subTitle: {
        fontSize: 20,
        marginHorizontal: 10
    },
    title: {
        flexGrow: 1,
        fontSize: 40,
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    titleAction: {
        //
    }
});
