import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native-paper';
import DayJS from 'dayjs';

import { useToast } from '../contexts/toast.js';
import { useLanguage } from '../contexts/language.js';
import HomeMetric from '../atoms/homeMetric.js';
import Page from '../organisms/page.js';
import API from '../../helpers/api.js';

import styles from './home.style.js';

export default function Home() {
    const defaultStats = {
        confirmed: 0,
        canceled: 0,
        pending: 0,
        total: 0
    };
    const { showToast } = useToast();
    const { getText } = useLanguage();
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
                        <HomeMetric
                            icon="check"
                            color={Colors.green500}
                            value={stats.confirmed}
                            label={getText('daysoff.status.confirmed')}
                            style={styles.metric}
                        />
                        <HomeMetric
                            icon="minus"
                            color={Colors.grey500}
                            value={stats.pending}
                            label={getText('daysoff.status.pending')}
                            style={styles.metric}
                        />
                    </View>
                    <View style={styles.metricsRow}>
                        <HomeMetric
                            icon="close"
                            color={Colors.red500}
                            value={stats.canceled}
                            label={getText('daysoff.status.canceled')}
                            style={styles.metric}
                        />
                        <HomeMetric
                            colored={false}
                            value={stats.total}
                            label={getText('metric.total')}
                            style={styles.metric}
                            raw
                        />
                    </View>
                </View>
            </View>
        </Page>
    );
}
