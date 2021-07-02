import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import { Appbar, Text } from 'react-native-paper';

import FreedayLogo from '../../assets/freeday-logo.png';

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    scrollContainer: {
        width: '100%'
    },
    scrollContent: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: 25
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

export default function Page({ children, filter, onFilter }) {
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content
                    title={(
                        <View style={styles.headerTitle}>
                            <Image source={FreedayLogo} style={styles.headerTitleLogo} />
                            <Text style={styles.headerTitleText}>Freeday</Text>
                        </View>
                    )}
                />
                {filter ? (
                    <Appbar.Action icon="filter" onPress={onFilter} />
                ) : null}
            </Appbar.Header>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
            >
                {children}
            </ScrollView>
        </View>
    );
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
    filter: PropTypes.bool,
    onFilter: PropTypes.func
};

Page.defaultProps = {
    filter: false,
    onFilter: () => {}
};
