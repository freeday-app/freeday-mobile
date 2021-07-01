import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        width: 200
    }
});

export default function Input(props) {
    const { type, value, onChange } = props;
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            secureTextEntry={type === 'password'}
            autoCapitalize="none"
        />
    );
}

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

Input.defaultProps = {
    type: 'text',
    value: '',
    onChange: () => {}
};
