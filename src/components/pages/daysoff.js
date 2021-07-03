import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import {
    Avatar,
    DataTable,
    Menu,
    IconButton,
    Colors,
    ActivityIndicator
} from 'react-native-paper';
import DayJS from 'dayjs';

import { useToast } from '../contexts/toast.js';
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
    const getDaysoff = async () => {
        try {
            const { daysoff: resultDaysoff } = await API.call({
                method: 'GET',
                route: '/api/daysoff'
            });
            setDaysoff(resultDaysoff);
            setLoadingDayoffId(null);
            setLoading(false);
        } catch (err) {
            showToast('Error while getting daysoff');
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
            showToast('Error while taking action on dayoff');
        }
    };
    useEffect(() => {
        getDaysoff();
    }, []);
    return (
        <Page loading={loading} filter onFilter={() => {}}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 3 }}>User</DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>Date</DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>Type</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}>Status</DataTable.Title>
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
                                <IconButton icon="close" size={25} color={Colors.red500} />
                            );
                        } else if (confirmed) {
                            status = (
                                <IconButton icon="check" size={25} color={Colors.green500} />
                            );
                        } else {
                            status = (
                                <IconButton icon="minus" size={25} color={Colors.grey500} />
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
                                        <Text>{DayJS(start).format('YYYY-MM-DD')}</Text>
                                        <Text>{DayJS(end).format('YYYY-MM-DD')}</Text>
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
                    title="Confirm"
                    onPress={() => {
                        hideMenu();
                        dayoffAction(menu.dayoffId, 'confirm');
                    }}
                />
                <Menu.Item
                    title="Cancel"
                    onPress={() => {
                        hideMenu();
                        dayoffAction(menu.dayoffId, 'cancel');
                    }}
                />
                <Menu.Item
                    title="Reset"
                    onPress={() => {
                        hideMenu();
                        dayoffAction(menu.dayoffId, 'reset');
                    }}
                />
            </Menu>
        </Page>
    );
}