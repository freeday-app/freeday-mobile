import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    dayoffList: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    dayoffItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        width: '100%'
    },
    dayoffItemUser: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexBasis: 1,
        flexGrow: 1.5
    },
    dayoffItemUserName: {
        marginLeft: 10
    },
    dayoffItemDates: {
        flexBasis: 1,
        flexGrow: 1
    },
    dayoffItemType: {
        flexBasis: 1,
        flexGrow: 1
    }
});
