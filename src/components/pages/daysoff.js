import React, { useState, useEffect } from 'react';
import DayJS from 'dayjs';

import { useToast } from '../contexts/toast.js';
import { useFilter } from '../contexts/filter.js';
import { useLanguage } from '../contexts/language.js';
import API from '../../helpers/api.js';
import Page from '../organisms/page.js';
import DayoffTable from '../molecules/dayoffTable.js';

export default function Daysoff() {
    const [loading, setLoading] = useState(true);
    const [daysoff, setDaysoff] = useState([]);
    const [loadingDayoffId, setLoadingDayoffId] = useState(null);
    const { showToast } = useToast();
    const { filterData } = useFilter();
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
    useEffect(() => {
        getDaysoff();
    }, [filterData]);
    return (
        <Page header filter loading={loading}>
            <DayoffTable
                daysoff={daysoff}
                loadingId={loadingDayoffId}
                onAction={({ dayoffId, action }) => {
                    dayoffAction(dayoffId, action);
                }}
            />
        </Page>
    );
}
