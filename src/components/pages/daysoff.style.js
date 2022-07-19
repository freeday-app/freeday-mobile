import { StyleSheet } from 'react-native';

import Colors from '../../helpers/colors.js';

export default (colors) => (
    StyleSheet.create({
        filterButton: {
            fontSize: 20
        },
        filterContainer: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row'
        },
        filterIndicator: {
            color: Colors.white,
            fontSize: 12
        },
        filterIndicatorContainer: {
            alignItems: 'center',
            backgroundColor: colors.primary,
            borderRadius: 50,
            display: 'flex',
            justifyContent: 'center',
            height: 20,
            width: 20
        }
    })
);
