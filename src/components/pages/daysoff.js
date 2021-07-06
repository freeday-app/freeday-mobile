import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import {
    Avatar,
    DataTable,
    Menu,
    IconButton,
    Colors,
    ActivityIndicator,
    Text
} from 'react-native-paper';
import DayJS from 'dayjs';

import { useToast } from '../contexts/toast.js';
import { useFilter } from '../contexts/filter.js';
import { useLanguage } from '../contexts/language.js';
import API from '../../helpers/api.js';
import Page from '../organisms/page.js';

import styles from './daysoff.style.js';

export default function Daysoff() {
    const [loading, setLoading] = useState(true);
    const [daysoff, setDaysoff] = useState([]);
    const [loadingDayoffId, setLoadingDayoffId] = useState(null);
    const defaultMenu = {
        visible: false,
        x: 0,
        y: 0,
        dayoffId: null
    };
    const [menu, setMenu] = useState(defaultMenu);
    const hideMenu = () => setMenu(defaultMenu);
    const { showToast } = useToast();
    const { filterData } = useFilter();
    const { getText } = useLanguage();
    const getDaysoff = async () => {
        try {
            const urlArgs = {
                page: 'all',
                order: 'asc'
            };
            if (filterData.start) {
                urlArgs.start = DayJS(filterData.start).format('YYYY-MM-DD');
            }
            if (filterData.end) {
                urlArgs.end = DayJS(filterData.end).format('YYYY-MM-DD');
            }
            if (filterData.dayoffTypes.length > 0) {
                urlArgs.type = filterData.dayoffTypes.map((d) => d.id).join(',');
            }
            if (filterData.slackUsers.length > 0) {
                urlArgs.slackUser = filterData.slackUsers.map((s) => s.id).join(',');
            }
            if (filterData.status.length > 0) {
                urlArgs.status = filterData.status[0].id;
            }
            const urlArgString = Object.keys(urlArgs).map((key) => (
                `${key}=${urlArgs[key]}`
            )).join('&');
            const { daysoff: resultDaysoff } = await API.call({
                method: 'GET',
                route: `/api/daysoff?${urlArgString}`
            });
            setDaysoff(resultDaysoff);
            setLoadingDayoffId(null);
            setLoading(false);
        } catch (err) {
            showToast(getText('daysoff.error.getData'));
        }
    };
    const dayoffAction = async (dayoffId, action) => {
        try {
            setLoadingDayoffId(dayoffId);
            await API.call({
                method: 'PUT',
                route: `/api/daysoff/${dayoffId}/${action}`
            });
            await getDaysoff();
        } catch (err) {
            showToast(getText('daysoff.error.action'));
        }
    };
    useEffect(() => {
        getDaysoff();
    }, [filterData]);
    return (
        <Page header filter loading={loading}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 3 }}>
                        {getText('daysoff.column.user')}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>
                        {getText('daysoff.column.date')}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>
                        {getText('daysoff.column.type')}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}>
                        {getText('daysoff.column.status')}
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
                        let status = null;
                        if (id === loadingDayoffId) {
                            status = (
                                <ActivityIndicator size="small" />
                            );
                        } else if (canceled) {
                            status = (
                                <IconButton
                                    icon="close"
                                    size={25}
                                    color={Colors.red500}
                                />
                            );
                        } else if (confirmed) {
                            status = (
                                <IconButton
                                    icon="check"
                                    size={25}
                                    color={Colors.green500}
                                />
                            );
                        } else {
                            status = (
                                <IconButton
                                    icon="minus"
                                    size={25}
                                    color={Colors.grey500}
                                />
                            );
                        }
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
                                <DataTable.Cell style={{ flex: 3 }}>
                                    <View style={styles.dayoffItemUser}>
                                        <Avatar.Image
                                            containerStyle={styles.dayoffItemUserAvatar}
                                            size={24}
                                            source={{ uri: avatar }}
                                        />
                                        <Text style={styles.dayoffItemUserName}>{username}</Text>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2 }}>
                                    <View>
                                        <Text>
                                            {DayJS(start).format(getText('date.format'))}
                                        </Text>
                                        <Text>
                                            {DayJS(end).format(getText('date.format'))}
                                        </Text>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2 }}>
                                    {type}
                                </DataTable.Cell>
                                <DataTable.Cell style={{ flex: 1 }}>
                                    {status}
                                </DataTable.Cell>
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
                        dayoffAction(menu.dayoffId, 'confirm');
                    }}
                />
                <Menu.Item
                    title={getText('daysoff.action.cancel')}
                    icon="close"
                    onPress={() => {
                        hideMenu();
                        dayoffAction(menu.dayoffId, 'cancel');
                    }}
                />
                <Menu.Item
                    title={getText('daysoff.action.reset')}
                    icon="minus"
                    onPress={() => {
                        hideMenu();
                        dayoffAction(menu.dayoffId, 'reset');
                    }}
                />
            </Menu>
        </Page>
    );
}
