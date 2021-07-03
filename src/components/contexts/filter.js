import React, { createContext, useState, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Portal, Modal } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import PropTypes from 'prop-types';
import DayJS from 'dayjs';

import Form from '../molecules/form.js';

const styles = StyleSheet.create({
    modal: {
        height: '100%',
        padding: 25,
        width: '100%'
    },
    modalContent: {
        alignItems: 'center',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 25,
        width: '100%'
    },
    scrollContainer: {
        height: '100%',
        width: '100%'
    }
});

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const [filterData, setFilterData] = useState({
        start: DayJS().startOf('month').toDate(),
        end: DayJS().endOf('month').toDate(),
        types: []
    });
    const [filterVisible, setFilterVisible] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const showFilter = () => {
        setFilterVisible(true);
    };
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
                                    {/*  */}
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Button
                                    icon="check"
                                    mode="contained"
                                    onPress={() => setDatePickerVisible(true)}
                                >
                                    Open
                                </Button>
                            </Form.Group>
                        </Form.Container>
                    </ScrollView>
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
