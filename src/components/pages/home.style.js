import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        marginHorizontal: 10
    },
    monthYear: {
        fontSize: 40,
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    metrics: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    metricsRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    metric: {
        flexBasis: 0,
        flexGrow: 1,
        margin: 10
    }
});
