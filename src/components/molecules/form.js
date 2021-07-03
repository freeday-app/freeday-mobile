import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%'
    },
    group: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
        width: '100%'
    },
    groupCenter: {
        justifyContent: 'center'
    },
    groupRow: {
        justifyContent: 'center'
    },
    label: {
        marginVertical: 10,
        width: '100%'
    },
    labelText: {
        fontSize: 15,
        textAlign: 'left',
        width: '100%'
    },
    input: {
        textAlign: 'left',
        width: '100%'
    }
});

function Container({ children }) {
    return (
        <View style={styles.form}>
            {children}
        </View>
    );
}

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired
};

function Group({ children, row, center }) {
    const rowStyle = row ? styles.groupRow : {};
    const centerStyle = center ? styles.groupCenter : {};
    return (
        <View style={{ ...styles.group, ...rowStyle, ...centerStyle }}>
            {children}
        </View>
    );
}

Group.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
    row: PropTypes.bool,
    center: PropTypes.bool
};

Group.defaultProps = {
    row: false,
    center: false
};

function Label({ text }) {
    return (
        <View style={styles.label}>
            <Text style={styles.labelText}>
                {text}
            </Text>
        </View>
    );
}

Label.propTypes = {
    text: PropTypes.string.isRequired
};

function Input({ children }) {
    return (
        <View style={styles.input}>
            {children}
        </View>
    );
}

Input.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired
};

export default {
    Container,
    Group,
    Label,
    Input
};
