import React from 'react';
import { View } from 'react-native';
import {
    Surface,
    Text,
    Colors
} from 'react-native-paper';
import PropTypes from 'prop-types';

import Types from '../../helpers/types.js';

import styles from './box.style.js';

export default function Box({
    color,
    label,
    content,
    style
}) {
    return (
        <Surface
            style={{
                ...styles.surface,
                backgroundColor: color,
                ...style
            }}
        >
            <Text style={{ ...styles.label, color: Colors.white }}>
                {label}
            </Text>
            <View style={styles.content}>
                {content}
            </View>
        </Surface>
    );
}

Box.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    content: Types.children.isRequired,
    style: PropTypes.object
};

Box.defaultProps = {
    color: 'transparent',
    style: {}
};
