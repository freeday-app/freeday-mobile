import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DayJS from 'dayjs';
import PropTypes from 'prop-types';

import { useToast } from '../contexts/toast.js';
import { useLanguage } from '../contexts/language.js';
import { useFilter } from '../contexts/filter.js';
import Metric from '../atoms/metric.js';
import Page from '../organisms/page.js';
import API from '../../helpers/api.js';
import Colors from '../../helpers/colors.js';

import styles from './home.style.js';

export default function Home({ navigation }) {
    const defaultStats = {
        confirmed: 0,
        canceled: 0,
        pending: 0,
        total: 0
    };
    const { showToast } = useToast();
    const { getText } = useLanguage();
    const { setFilterData } = useFilter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(defaultStats);
    const getStats = async () => {
        try {
            const { daysoff: resultDaysoff } = await API.call({
                method: 'GET',
                route: '/api/daysoff',
                query: {
                    start: DayJS().startOf('month').format('YYYY-MM-DD'),
                    end: DayJS().endOf('month').format('YYYY-MM-DD')
                }
            });
            const statsObj = {
                ...defaultStats,
                total: resultDaysoff.length
            };
            for (const dayoff of resultDaysoff) {
                if (dayoff.confirmed) {
                    statsObj.confirmed += 1;
                } else if (dayoff.canceled) {
                    statsObj.canceled += 1;
                } else {
                    statsObj.pending += 1;
                }
            }
            setStats(statsObj);
            setLoading(false);
        } catch (err) {
            showToast(getText('home.error.getData'));
        }
    };

    const onPressMetric = (status) => {
        navigation.navigate(getText('daysoff.title'));
        setFilterData({
            start: DayJS().startOf('month').toDate(),
            end: DayJS().endOf('month').toDate(),
            dayoffTypes: [],
            slackUsers: [],
            status
        });
    };
    useEffect(() => {
        getStats();
    }, []);
    return (
        <Page
            header
            scroll
            loading={loading}
            preTitle={getText('home.title').toUpperCase()}
            title={`${
                getText(`month.${DayJS().month() + 1}`)
            } ${DayJS().year()}`}
        >
            <View style={styles.container}>
                <View style={styles.metrics}>
                    <View style={styles.metricsRow}>
                        <Metric
                            icon="check"
                            color={Colors.green}
                            value={stats.confirmed}
                            label={getText('daysoff.status.confirmed')}
                            style={styles.metric}
                            onPress={() => onPressMetric([{
                                icon: 'check',
                                id: 'confirmed',
                                name: 'Confirmé'
                            }])}
                        />
                        <Metric
                            icon="minus"
                            color={Colors.blue}
                            value={stats.pending}
                            label={getText('daysoff.status.pending')}
                            style={styles.metric}
                            onPress={() => onPressMetric([{
                                icon: 'minus',
                                id: 'pending',
                                name: 'En attente'
                            }])}
                        />
                    </View>
                    <View style={styles.metricsRow}>
                        <Metric
                            icon="close"
                            color={Colors.red}
                            value={stats.canceled}
                            label={getText('daysoff.status.canceled')}
                            style={styles.metric}
                            onPress={() => onPressMetric([{
                                icon: 'window-close',
                                id: 'canceled',
                                name: 'Annulé'
                            }])}
                        />
                        <Metric
                            colored={false}
                            value={stats.total}
                            label={getText('metric.total')}
                            style={styles.metric}
                            raw
                            onPress={() => onPressMetric([])}
                        />
                    </View>
                </View>
            </View>
        </Page>
    );
}

Home.propTypes = {
    // ViewPropTypes.style is deprecated
    // it's replaced with PropTypes.object for now
    // eslint-disable-next-line react/forbid-prop-types
    navigation: PropTypes.object.isRequired
};
