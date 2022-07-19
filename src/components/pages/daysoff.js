import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import DayJS from 'dayjs';

import { useToast } from '../contexts/toast.js';
import { useFilter } from '../contexts/filter.js';
import { useLanguage } from '../contexts/language.js';
import API from '../../helpers/api.js';
import Page from '../organisms/page.js';
import DayoffItem from '../molecules/dayoffItem.js';

import getStyles from './daysoff.style.js';

export default function Daysoff() {
    const [loading, setLoading] = useState(true);
    const [daysoff, setDaysoff] = useState([]);
    const [loadingDayoffId, setLoadingDayoffId] = useState(null);
    const {
        showFilter,
        filterData,
        activeFilterCount,
        isFilterActive
    } = useFilter();
    const { showToast } = useToast();
    const { getText } = useLanguage();
    const getDaysoff = async () => {
        try {
            const query = {
                page: 'all',
                order: 'asc'
            };
            if (filterData.start) {
                query.start = DayJS(filterData.start).format('YYYY-MM-DD');
            }
            if (filterData.end) {
                query.end = DayJS(filterData.end).format('YYYY-MM-DD');
            }
            if (filterData.dayoffTypes.length > 0) {
                query.type = filterData.dayoffTypes.map((d) => d.id).join(',');
            }
            if (filterData.slackUsers.length > 0) {
                query.slackUser = filterData.slackUsers.map((s) => s.id).join(',');
            }
            if (filterData.status.length > 0) {
                query.status = filterData.status[0].id;
            }
            const { daysoff: resultDaysoff } = await API.call({
                method: 'GET',
                route: '/api/daysoff',
                query
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

    const { colors } = useTheme();

    const styles = getStyles(colors);

    useEffect(() => {
        getDaysoff();
    }, [filterData]);
    return (
        <Page
            header
            scroll
            filter
            loading={loading}
            title={getText('daysoff.title')}
            titleAction={(
                <View style={styles.filterContainer}>
                    <Button
                        labelStyle={styles.filterButton}
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        uppercase={false}
                        icon={isFilterActive
                            ? () => (
                                <View style={styles.filterIndicatorContainer}>
                                    <Text style={styles.filterIndicator}>
                                        {activeFilterCount}
                                    </Text>
                                </View>
                            ) : 'filter'}
                        onPress={() => showFilter()}
                    >
                        {getText('filter.title')}
                    </Button>
                </View>
            )}
        >
            {daysoff.map((dayoff) => (
                <DayoffItem
                    key={dayoff.id}
                    dayoff={dayoff}
                    onConfirm={(id) => dayoffAction(id, 'confirm')}
                    onCancel={(id) => dayoffAction(id, 'cancel')}
                    onReset={(id) => dayoffAction(id, 'reset')}
                    loading={loadingDayoffId === dayoff.id}
                />
            ))}
        </Page>
    );
}
