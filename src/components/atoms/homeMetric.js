import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import {
    Surface,
    Avatar,
    Text,
    Colors
} from 'react-native-paper';
import PropTypes from 'prop-types';

import styles from './homeMetric.style.js';

export default function HomeMetric({
    icon,
    color,
    value,
    label,
    raw,
    style
}) {
    const rawStyle = raw ? styles.surfaceRaw : {};
    return (
        <Surface
            style={{
                ...styles.surface,
                ...rawStyle,
                backgroundColor: color,
                ...style
            }}
        >
            {icon ? (
                <Avatar.Icon
                    size={35}
                    icon={icon}
                    backgroundColor={Colors.white}
                    color={color}
                    style={styles.leftIcon}
                />
            ) : null}
            <View style={styles.rightContainer}>
                <Text
                    style={{
                        ...styles.value,
                        color: raw ? Colors.black : Colors.white
                    }}
                >
                    {value.toString()}
                </Text>
                <Text
                    style={{
                        ...styles.label,
                        color: raw ? Colors.black : Colors.white
                    }}
                >
                    {label}
                </Text>
            </View>
        </Surface>
    );
}

HomeMetric.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    label: PropTypes.string.isRequired,
    raw: PropTypes.bool,
    style: ViewPropTypes.style
};

HomeMetric.defaultProps = {
    icon: null,
    color: 'transparent',
    raw: false,
    style: {}
};