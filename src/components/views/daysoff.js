import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import PropTypes from 'prop-types';
import DayJS from 'dayjs';

import API from '../../helpers/api.js';
import Page from '../organisms/page.js';

const styles = StyleSheet.create({
    dayoffList: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    dayoffItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        width: '100%'
    },
    dayoffItemUser: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexBasis: 1,
        flexGrow: 1.5
    },
    dayoffItemUserAvatar: {
        //
    },
    dayoffItemUserName: {
        marginLeft: 10
    },
    dayoffItemDates: {
        flexBasis: 1,
        flexGrow: 1
    },
    dayoffItemType: {
        flexBasis: 1,
        flexGrow: 1
    }
});

function DayoffList({ children }) {
    return (
        <View style={styles.dayoffList}>
            {children}
        </View>
    );
}

DayoffList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired
};

function DayoffItem({
    id,
    avatar,
    username,
    type,
    start,
    end,
    onPress
}) {
    return (
        <TouchableOpacity style={styles.dayoffItem} onPress={() => onPress(id)}>
            <View style={styles.dayoffItemUser}>
                <Avatar
                    containerStyle={styles.dayoffItemUserAvatar}
                    rounded
                    source={{
                        uri: avatar
                    }}
                />
                <Text style={styles.dayoffItemUserName}>{username}</Text>
            </View>
            <View style={styles.dayoffItemDates}>
                <View>
                    <Text>{DayJS(start).format('YYYY-MM-DD')}</Text>
                </View>
                <View>
                    <Text>{DayJS(end).format('YYYY-MM-DD')}</Text>
                </View>
            </View>
            <View style={styles.dayoffItemType}>
                <Text>{type}</Text>
            </View>
        </TouchableOpacity>
    );
}

DayoffItem.propTypes = {
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    onPress: PropTypes.func
};

DayoffItem.defaultProps = {
    onPress: () => {}
};

export default function Daysoff() {
    const [daysoff, setDaysoff] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { daysoff: resultDaysoff } = await API.call({
                    method: 'GET',
                    route: '/api/daysoff'
                });
                setDaysoff(resultDaysoff);
            } catch (err) {
                Toast.show('Error while getting daysoff', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.TOP
                });
            }
        })();
    }, []);
    return (
        <Page filter onFilter={() => {}}>
            <DayoffList>
                {
                    daysoff.map((dayoff) => (
                        <DayoffItem
                            key={dayoff.id}
                            id={dayoff.id}
                            avatar={dayoff.slackUser.avatar}
                            username={dayoff.slackUser.name}
                            type={dayoff.type.name}
                            start={dayoff.start}
                            end={dayoff.end}
                            onPress={(dayoffId) => {
                                //
                            }}
                        />
                    ))
                }
            </DayoffList>
        </Page>
    );
}
