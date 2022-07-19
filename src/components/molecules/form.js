import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

import styles from './form.style.js';
import Types from '../../helpers/types.js';

function Container({ children, style }) {
    return (
        <View
            style={{
                ...styles.form,
                ...(style ?? {})
            }}
            >
            {children}
        </View>
    );
}

Container.propTypes = {
    children: Types.children.isRequired
};

function Group({
    children,
    row,
    center,
    inline,
    style
}) {
    const rowStyle = row ? styles.groupRow : {};
    const centerStyle = center ? styles.groupCenter : {};
    const directionStyle = inline ? styles.groupInline : styles.groupBlock;
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { inline });
        }
        return child;
    });
    return (
        <View
            style={{
                ...styles.group,
                ...rowStyle,
                ...centerStyle,
                ...directionStyle,
                ...(style ?? {})
            }}
        >
            {childrenWithProps}
        </View>
    );
}

Group.propTypes = {
    children: Types.children.isRequired,
    row: PropTypes.bool,
    center: PropTypes.bool,
    inline: PropTypes.bool
};

Group.defaultProps = {
    row: false,
    center: false,
    inline: false
};

function Label({ children, inline, style }) {
    const directionStyle = inline ? styles.labelInline : styles.labelBlock;
    return (
        <View
            style={{
                ...styles.label,
                ...directionStyle,
                ...(style ?? {})
            }}
        >
            <Text style={styles.labelText}>
                {children}
            </Text>
        </View>
    );
}

Label.propTypes = {
    children: Types.children.isRequired,
    inline: PropTypes.bool
};

Label.defaultProps = {
    inline: false
};

function Input({ children, inline, style }) {
    const directionStyle = inline ? styles.inputInline : styles.inputBlock;
    return (
        <View
            style={{
                ...styles.input,
                ...directionStyle,
                ...(style ?? {})
            }}
        >
            {children}
        </View>
    );
}

Input.propTypes = {
    children: Types.children.isRequired,
    inline: PropTypes.bool
};

Input.defaultProps = {
    inline: false
};

export default {
    Container,
    Group,
    Label,
    Input
};
