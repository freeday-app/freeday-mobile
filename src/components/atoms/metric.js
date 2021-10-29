import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import {
    Surface,
    Avatar,
    Text,
    Colors
} from 'react-native-paper';
import PropTypes from 'prop-types';

import { useTheme } from '../contexts/theme.js';

import styles from './metric.style.js';

export default function Metric({
    icon,
    color,
    value,
    label,
    raw,
    style
}) {
    const { themeData } = useTheme();
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
                        color: raw ? themeData.colors.text : Colors.white
                    }}
                >
                    {value.toString()}
                </Text>
                <Text
                    style={{
                        ...styles.label,
                        color: raw ? themeData.colors.text : Colors.white
                    }}
                >
                    {label}
                </Text>
            </View>
        </Surface>
    );
}

Metric.propTypes = {
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

Metric.defaultProps = {
    icon: null,
    color: 'transparent',
    raw: false,
    style: {}
};
