import React from 'react';
import { View } from 'react-native';
import {
    ActivityIndicator,
    Surface,
    Avatar,
    Text,
    Button,
    IconButton
} from 'react-native-paper';
import DayJS from 'dayjs';
import PropTypes from 'prop-types';

import { useLanguage } from '../contexts/language.js';
import Types from '../../helpers/types.js';
import Colors from '../../helpers/colors.js';

import styles from './dayoffItem.style.js';

export default function DayoffItem({
    dayoff,
    onConfirm,
    onCancel,
    onReset,
    loading
}) {
    const { getText } = useLanguage();
    const {
        id,
        start,
        end,
        confirmed,
        canceled,
        slackUser: {
            name: username,
            avatar
        },
        type: {
            name: type
        }
    } = dayoff;
    let status = 'pending';
    let statusColor = Colors.blue;
    let confirmButtonColor = Colors.lightGrey;
    let cancelButtonColor = Colors.lightGrey;
    if (confirmed) {
        status = 'confirmed';
        statusColor = Colors.green;
        confirmButtonColor = Colors.green;
    } else if (canceled) {
        status = 'canceled';
        statusColor = Colors.red;
        cancelButtonColor = Colors.red;
    }
    return (
        <Surface style={{ ...styles.surface, backgroundColor: Colors.white, position: 'relative' }}>
            <View style={{ ...styles.row, ...styles.marginBottom }}>
                {loading ? (
                    <ActivityIndicator
                        size={40}
                        style={styles.avatar}
                    />
                ) : (
                    <Avatar.Image
                        size={40}
                        source={{ uri: avatar }}
                        style={styles.avatar}
                    />
                )}
                <View style={styles.headInfo}>
                    <Text style={styles.username}>
                        {username}
                    </Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>
                            {`${getText('daysoff.field.status')} : `}
                        </Text>
                        <Text style={{ ...styles.value, color: statusColor }}>
                            {getText(`daysoff.status.${status}`)}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>
                    {`${getText('daysoff.field.type')} : `}
                </Text>
                <Text style={styles.value}>
                    {type}
                </Text>
            </View>
            <View style={{ ...styles.row, ...styles.marginBottom }}>
                <Text style={styles.label}>
                    {`${getText('date.from')} `}
                </Text>
                <Text style={styles.value}>
                    {DayJS(start).format(getText('date.format'))}
                </Text>
                <Text style={styles.label}>
                    {` ${getText('date.to', null, false)} `}
                </Text>
                <Text style={styles.value}>
                    {DayJS(end).format(getText('date.format'))}
                </Text>
            </View>
            <View style={styles.row}>
                <View style={styles.reset}>
                    <Button mode="text" onPress={() => onReset(id)} compact>
                        {getText('daysoff.action.reset')}
                    </Button>
                </View>
                <View style={styles.actions}>
                    <IconButton
                        icon="check"
                        size={20}
                        color={Colors.white}
                        style={{
                            ...styles.action,
                            backgroundColor: confirmButtonColor
                        }}
                        onPress={() => onConfirm(id)}
                    />
                    <IconButton
                        icon="close"
                        size={20}
                        color={Colors.white}
                        style={{
                            ...styles.action,
                            backgroundColor: cancelButtonColor
                        }}
                        onPress={() => onCancel(id)}
                    />
                </View>
            </View>
        </Surface>
    );
}

DayoffItem.propTypes = {
    dayoff: Types.dayoff.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

DayoffItem.defaultProps = {
    loading: false
};
