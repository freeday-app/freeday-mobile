import React from 'react';
import { View } from 'react-native';
import {
    Surface,
    Avatar,
    Text,
    Button,
    Colors
} from 'react-native-paper';
import DayJS from 'dayjs';
// import PropTypes from 'prop-types';

import { useLanguage } from '../contexts/language.js';
import Types from '../../helpers/types.js';

import styles from './dayoffItem.style.js';

export default function DayoffItem({ dayoff }) {
    const { getText } = useLanguage();
    const {
        // id,
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
    if (confirmed) { status = 'confirmed'; }
    if (canceled) { status = 'canceled'; }
    return (
        <Surface style={styles.surface}>
            <View>
                <Avatar.Image
                    size={24}
                    source={{ uri: avatar }}
                />
                <View>
                    <Text>{username}</Text>
                    <View>
                        <Text>
                            {`${getText('daysoff.field.status')} : `}
                        </Text>
                        <Text>
                            {getText(`daysoff.status.${status}`)}
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                <Text>
                    {`${getText('daysoff.field.type')} : `}
                </Text>
                <Text>
                    {type}
                </Text>
            </View>
            <View>
                <Text>
                    {`${getText('date.from')} `}
                </Text>
                <Text>
                    {DayJS(start).format(getText('date.format'))}
                </Text>
                <Text>
                    {`${getText('date.to')} `}
                </Text>
                <Text>
                    {DayJS(end).format(getText('date.format'))}
                </Text>
            </View>
            <View>
                <View>
                    <Button>
                        {getText('daysoff.action.reset')}
                    </Button>
                </View>
                <View>
                    <Avatar.Icon
                        size={25}
                        icon="check"
                        backgroundColor={Colors.green500}
                        color={Colors.white}
                    />
                    <Avatar.Icon
                        size={25}
                        icon="close"
                        backgroundColor={Colors.red500}
                        color={Colors.white}
                    />
                </View>
            </View>
        </Surface>
    );
}

DayoffItem.propTypes = {
    dayoff: Types.dayoff.isRequired
};
