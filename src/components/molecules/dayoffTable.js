import React, { useState } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import {
    Avatar,
    DataTable,
    Menu,
    Text
} from 'react-native-paper';
import DayJS from 'dayjs';
import PropTypes from 'prop-types';

import DayoffStatus from '../atoms/dayoffStatus.js';
import { useLanguage } from '../contexts/language.js';
import Types from '../../helpers/types.js';

import styles from './dayoffTable.style.js';

export default function DayoffTable({
    daysoff,
    loadingId,
    onAction
}) {
    const defaultMenu = {
        visible: false,
        x: 0,
        y: 0,
        dayoffId: null
    };
    const [menu, setMenu] = useState(defaultMenu);
    const hideMenu = () => setMenu(defaultMenu);
    const { getText } = useLanguage();
    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 3 }}>
                        {getText('daysoff.field.user')}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }}>
                        {getText('daysoff.field.date')}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>
                        {getText('daysoff.field.type')}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}>
                        {getText('daysoff.field.status')}
                    </DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {daysoff.map(({
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
                    }) => {
                        let status = 'pending';
                        if (confirmed) {
                            status = 'confirmed';
                        } else if (canceled) {
                            status = 'canceled';
                        }
                        const statusLoading = loadingId && id === loadingId;
                        return (
                            <DataTable.Row
                                key={id}
                                onPress={(e) => {
                                    setMenu({
                                        visible: true,
                                        x: e.nativeEvent.pageX,
                                        y: e.nativeEvent.pageY,
                                        dayoffId: id
                                    });
                                }}
                            >
                                <View style={{ ...styles.dayoffCell, flex: 3 }}>
                                    <Avatar.Image
                                        size={24}
                                        source={{ uri: avatar }}
                                        style={styles.dayoffUserAvatar}
                                    />
                                    <Text style={styles.dayoffCellText} numberOfLines={2}>
                                        {username}
                                    </Text>
                                </View>
                                <View numberOfLines={2} style={{ ...styles.dayoffCell, flex: 3 }}>
                                    <Text style={styles.dayoffCellText} numberOfLines={2}>
                                        {`${
                                            getText('date.periodFrom', [
                                                DayJS(start).format(getText('date.format'))
                                            ])
                                        }\n${
                                            getText('date.periodTo', [
                                                DayJS(end).format(getText('date.format'))
                                            ], false)
                                        }`}
                                    </Text>
                                </View>
                                <View style={{ ...styles.dayoffCell, flex: 2 }}>
                                    <Text style={styles.dayoffCellText} numberOfLines={2}>
                                        {type}
                                    </Text>
                                </View>
                                <View style={{ ...styles.dayoffCell, flex: 1 }}>
                                    <DayoffStatus
                                        status={status}
                                        loading={statusLoading}
                                        size={25}
                                    />
                                </View>
                            </DataTable.Row>
                        );
                    })}
                </ScrollView>
            </DataTable>
            <Menu
                visible={menu.visible}
                onDismiss={() => hideMenu()}
                anchor={{
                    x: menu.x,
                    y: menu.y
                }}
            >
                <Menu.Item
                    title={getText('daysoff.action.confirm')}
                    icon="check"
                    onPress={() => {
                        hideMenu();
                        onAction(menu.dayoffId, 'confirm');
                    }}
                />
                <Menu.Item
                    title={getText('daysoff.action.cancel')}
                    icon="close"
                    onPress={() => {
                        hideMenu();
                        onAction(menu.dayoffId, 'cancel');
                    }}
                />
                <Menu.Item
                    title={getText('daysoff.action.reset')}
                    icon="minus"
                    onPress={() => {
                        hideMenu();
                        onAction(menu.dayoffId, 'reset');
                    }}
                />
            </Menu>
        </>
    );
}

DayoffTable.propTypes = {
    daysoff: PropTypes.arrayOf(
        Types.dayoff
    ).isRequired,
    loadingId: PropTypes.string,
    onAction: PropTypes.func
};

DayoffTable.defaultProps = {
    loadingId: null,
    onAction: () => {}
};
