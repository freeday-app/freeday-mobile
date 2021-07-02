import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';

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
    }
});

export default function Page({ children, filter, onFilter }) {
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Freeday" />
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
