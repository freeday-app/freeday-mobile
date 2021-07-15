import React from 'react';
import {
    ActivityIndicator,
    IconButton,
    Colors
} from 'react-native-paper';
import PropTypes from 'prop-types';

export default function DayoffStatus({
    status,
    loading,
    size
}) {
    if (loading) {
        return (
            <ActivityIndicator size="small" />
        );
    }
    if (status === 'canceled') {
        return (
            <IconButton
                icon="close"
                size={size}
                color={Colors.red500}
            />
        );
    }
    if (status === 'confirmed') {
        return (
            <IconButton
                icon="check"
                size={size}
                color={Colors.green500}
            />
        );
    }
    return (
        <IconButton
            icon="minus"
            size={size}
            color={Colors.grey500}
        />
    );
}

DayoffStatus.propTypes = {
    status: PropTypes.oneOf([
        'confirmed',
        'canceled',
        'pending'
    ]).isRequired,
    loading: PropTypes.bool,
    size: PropTypes.number
};

DayoffStatus.defaultProps = {
    size: 25,
    loading: false
};
