import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import {
    Appbar,
    Text,
    ActivityIndicator
} from 'react-native-paper';
import PropTypes from 'prop-types';

import FreedayLogo from '../../assets/freeday-logo.png';

const styles = StyleSheet.create({
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

export default function Page({
    children,
    scroll,
    filter,
    onFilter,
    loading
}) {
    let content = null;
    if (loading) {
        content = (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else if (scroll) {
        content = (
            <ScrollView style={styles.content}>
                {children}
            </ScrollView>
        );
    } else {
        content = (
            <View style={styles.content}>
                {children}
            </View>
        );
    }
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
            {content}
        </View>
    );
}

Page.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
    scroll: PropTypes.bool,
    filter: PropTypes.bool,
    onFilter: PropTypes.func
};

Page.defaultProps = {
    loading: false,
    scroll: false,
    filter: false,
    onFilter: () => {}
};
