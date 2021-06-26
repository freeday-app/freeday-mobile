import React from 'react';
import { Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    button: {
        //
    }
});

export default function CustomButton(props) {
    const { text, onPress, accessibility } = props;
    return (
        <Button
            Button={onPress}
            title={text}
            accessibilityLabel={accessibility}
            styles={styles.button}
        />
    );
}

CustomButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    accessibility: PropTypes.string
};

CustomButton.defaultProps = {
    text: '',
    onPress: () => {},
    accessibility: ''
};
