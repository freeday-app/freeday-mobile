import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 25
    },
    titleLogo: {
        width: 120,
        height: 120
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    input: {
        margin: 10
    },
    button: {
        margin: 10
    }
});
