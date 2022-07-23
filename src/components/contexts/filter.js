import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo
} from 'react';
import { ScrollView, View } from 'react-native';
import {
    IconButton,
    Button,
    Portal,
    Modal,
    Text
} from 'react-native-paper';
import {
    DatePickerModal,
    registerTranslation,
    en as reactNativePaperDatesEnLanguage
} from 'react-native-paper-dates';
import DayJS from 'dayjs';

import { useToast } from './toast.js';
import { useLanguage } from './language.js';
import { useTheme } from './theme.js';
import Form from '../molecules/form.js';
import Select from '../atoms/select.js';
import API from '../../helpers/api.js';
import Types from '../../helpers/types.js';
import frLanguage from '../../languages/fr.js';

import styles from './filter.style.js';

registerTranslation('en', reactNativePaperDatesEnLanguage);
registerTranslation('fr', frLanguage.reactNativePaperDates);

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const { showToast } = useToast();
    const { language, getText } = useLanguage();
    const { themeData } = useTheme();

    const defaultFilterData = {
        start: DayJS().startOf('month').toDate(),
        end: DayJS().endOf('month').toDate(),
        dayoffTypes: [],
        slackUsers: [],
        status: []
    };

    const availableStatus = [{
        id: 'confirmed',
        name: getText('daysoff.status.confirmed'),
        icon: 'check'
    }, {
        id: 'canceled',
        name: getText('daysoff.status.canceled'),
        icon: 'window-close'
    }, {
        id: 'pending',
        name: getText('daysoff.status.pending'),
        icon: 'minus'
    }];

    const [filterMetaData, setFilterMetaData] = useState({
        dayoffTypes: [],
        slackUsers: [],
        status: availableStatus
    });
    const [filterData, setFilterData] = useState(defaultFilterData);
    const [filterVisible, setFilterVisible] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [activeFilterCount, setActiveFilterCount] = useState(0);
    const [isFilterActive, setIsFilterActive] = useState(activeFilterCount > 0);

    const countActiveFilters = () => {
        let filterCount = 0;
        if (filterData.dayoffTypes.length) { filterCount += 1; }
        if (filterData.slackUsers.length) { filterCount += 1; }
        if (filterData.status.length) { filterCount += 1; }
        if (
            DayJS(filterData.start).format('YYYY-MM-DD') !== DayJS().startOf('month').format('YYYY-MM-DD')
            || DayJS(filterData.end).format('YYYY-MM-DD') !== DayJS().endOf('month').format('YYYY-MM-DD')
        ) {
            filterCount += 1;
        }
        return filterCount;
    };

    const showFilter = () => {
        setFilterVisible(true);
    };

    const resetFilter = () => {
        setFilterData(defaultFilterData);
    };

    const getFilterMetaData = async () => {
        try {
            const { dayoffTypes } = await API.call({
                method: 'GET',
                route: '/api/daysoff/types'
            });
            const { slackUsers } = await API.call({
                method: 'GET',
                route: '/api/slack/users'
            });
            setFilterMetaData({
                ...filterMetaData,
                dayoffTypes: dayoffTypes.map(({ id, name, emoji }) => ({
                    id,
                    name,
                    emoji
                })),
                slackUsers: slackUsers.map(({ slackId, name, avatar }) => ({
                    id: slackId,
                    name,
                    image: avatar
                }))
            });
        } catch (err) {
            showToast(getText('filter.error.getData'));
        }
    };

    const getStatus = (statusId) => (
        availableStatus.find(({ id }) => (
            statusId === id
        )) ?? null
    );

    useEffect(() => {
        getFilterMetaData();
    }, []);

    useEffect(() => {
        setActiveFilterCount(countActiveFilters());
    }, [filterData]);

    useEffect(() => {
        setIsFilterActive(activeFilterCount > 0);
    }, [activeFilterCount]);

    const contextValue = useMemo(() => ({
        filterData,
        setFilterData,
        showFilter,
        resetFilter,
        activeFilterCount,
        isFilterActive,
        defaultFilterData,
        getStatus
    }), [
        filterData,
        setFilterData,
        showFilter,
        resetFilter,
        activeFilterCount,
        isFilterActive,
        defaultFilterData,
        getStatus
    ]);

    return (
        <FilterContext.Provider value={contextValue}>
            <Portal>
                <DatePickerModal
                    locale={language}
                    mode="range"
                    saveLabel="Save"
                    label={getText('button.selectPeriod')}
                    animationType="slide"
                    visible={datePickerVisible}
                    onDismiss={() => setDatePickerVisible(false)}
                    startDate={filterData.start}
                    endDate={filterData.end}
                    validRange={{
                        startDate: DayJS().subtract(5, 'year').toDate(),
                        endDate: DayJS().add(5, 'year').toDate()
                    }}
                    onConfirm={({ startDate, endDate }) => {
                        setFilterData({
                            ...filterData,
                            start: startDate,
                            end: endDate
                        });
                        setDatePickerVisible(false);
                    }}
                />
                <Modal
                    visible={filterVisible}
                    onDismiss={() => setFilterVisible(false)}
                    style={styles.modal}
                    contentContainerStyle={{
                        ...styles.modalContent,
                        backgroundColor: themeData.colors.background
                    }}
                >
                    <View style={styles.title}>
                        <IconButton icon="filter" style={styles.titleIcon} />
                        <Text style={styles.titleText}>
                            {getText('filter.title')}
                        </Text>
                        {isFilterActive ? (
                            <Button
                                icon="close"
                                mode="text"
                                onPress={() => resetFilter()}
                                style={styles.clearButton}
                                labelStyle={styles.clearButtonTitle}
                            >
                                {getText('button.clear')}
                            </Button>
                        ) : null}
                    </View>
                    <ScrollView style={styles.scrollContainer}>
                        <Form.Container style={styles.formContainer}>
                            <Form.Group inline>
                                <Form.Label>
                                    {getText('filter.field.period')}
                                </Form.Label>
                                <Form.Input>
                                    <Button
                                        mode="text"
                                        uppercase={false}
                                        onPress={() => setDatePickerVisible(true)}
                                        compact
                                    >
                                        {getText('date.period', [
                                            DayJS(filterData.start).format(getText('date.format')),
                                            DayJS(filterData.end).format(getText('date.format'))
                                        ])}
                                    </Button>
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    {getText('filter.field.types')}
                                </Form.Label>
                                <Form.Input>
                                    <Select
                                        multiple
                                        items={filterMetaData.dayoffTypes}
                                        selectedItems={filterData.dayoffTypes}
                                        onSelect={(dayoffTypes) => {
                                            setFilterData({
                                                ...filterData,
                                                dayoffTypes
                                            });
                                        }}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    {getText('filter.field.users')}
                                </Form.Label>
                                <Form.Input>
                                    <Select
                                        multiple
                                        items={filterMetaData.slackUsers}
                                        selectedItems={filterData.slackUsers}
                                        onSelect={(slackUsers) => {
                                            setFilterData({
                                                ...filterData,
                                                slackUsers
                                            });
                                        }}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    {getText('filter.field.status')}
                                </Form.Label>
                                <Form.Input>
                                    <Select
                                        clearButton
                                        items={filterMetaData.status}
                                        selectedItems={filterData.status}
                                        onSelect={(status) => {
                                            setFilterData({
                                                ...filterData,
                                                status
                                            });
                                        }}
                                    />
                                </Form.Input>
                            </Form.Group>
                        </Form.Container>
                    </ScrollView>
                    <Button
                        icon="check"
                        mode="contained"
                        onPress={() => setFilterVisible(false)}
                        style={styles.submitButton}
                    >
                        {getText('button.submit')}
                    </Button>
                </Modal>
            </Portal>
            {children}
        </FilterContext.Provider>
    );
}

FilterProvider.propTypes = {
    children: Types.children.isRequired
};

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within an FilterProvider');
    }
    return context;
}
