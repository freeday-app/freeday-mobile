import React, {
    createContext,
    useState,
    useContext,
    useEffect
} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Portal, Modal } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import PropTypes from 'prop-types';
import DayJS from 'dayjs';

import { useToast } from './toast.js';
import Form from '../molecules/form.js';
import Select from '../atoms/select.js';
import API from '../../helpers/api.js';

const styles = StyleSheet.create({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        width: '100%'
    },
    modalContent: {
        alignItems: 'center',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        padding: 25,
        width: '100%'
    },
    scrollContainer: {
        flexGrow: 1,
        width: '100%'
    },
    submitButton: {
        marginTop: 10,
        width: '100%'
    }
});

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const { showToast } = useToast();
    const [filterMetaData, setFilterMetaData] = useState({
        dayoffTypes: [],
        slackUsers: [],
        status: [{
            id: 'confirmed',
            name: 'Confirmed',
            icon: 'check'
        }, {
            id: 'canceled',
            name: 'Canceled',
            icon: 'window-close'
        }]
    });
    const [filterData, setFilterData] = useState({
        start: DayJS().startOf('month').toDate(),
        end: DayJS().endOf('month').toDate(),
        dayoffTypes: [],
        slackUsers: [],
        status: []
    });
    const [filterVisible, setFilterVisible] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const showFilter = () => {
        setFilterVisible(true);
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
            showToast('Error while getting dayoff types');
        }
    };
    useEffect(() => {
        getFilterMetaData();
    }, []);
    return (
        <FilterContext.Provider value={{ filterData, showFilter }}>
            <Portal>
                <Modal
                    visible={filterVisible}
                    onDismiss={() => setFilterVisible(false)}
                    style={styles.modal}
                    contentContainerStyle={styles.modalContent}
                >
                    <ScrollView style={styles.scrollContainer}>
                        <DatePickerModal
                            locale="en"
                            mode="range"
                            saveLabel="Save"
                            label="Select date"
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
                        <Form.Container>
                            <Form.Group>
                                <Form.Label text="Period" />
                                <Form.Input>
                                    <Button
                                        mode="text"
                                        uppercase={false}
                                        onPress={() => setDatePickerVisible(true)}
                                    >
                                        {`From ${
                                            DayJS(filterData.start).format('YYYY-MM-DD')
                                        } to ${
                                            DayJS(filterData.end).format('YYYY-MM-DD')
                                        }`}
                                    </Button>
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label text="Types" />
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
                                <Form.Label text="Slack users" />
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
                                <Form.Label text="Status" />
                                <Form.Input>
                                    <Select
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
                        Submit
                    </Button>
                </Modal>
            </Portal>
            {children}
        </FilterContext.Provider>
    );
}

FilterProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired
};

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within an FilterProvider');
    }
    return context;
}
