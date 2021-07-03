/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    Avatar,
    Button,
    Portal,
    Modal,
    Chip,
    List
} from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%'
    },
    select: {
        //
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        width: '100%'
    },
    modalContent: {
        backgroundColor: 'white',
        flexGrow: 1,
        padding: 25,
        width: '100%'
    },
    selectedItems: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10
    },
    selectedItem: {
        marginHorizontal: 5,
        marginVertical: 2
    }
});

export default function Select({
    multiple,
    items,
    selectedItems,
    onSelect
}) {
    const [open, setOpen] = useState(false);
    const itemsObj = Object.fromEntries(
        items.map((item) => [item.id, item])
    );
    const firstSelectedItem = selectedItems.length > 0 ? (
        [selectedItems[0]]
    ) : [];
    const selectedItemsObj = Object.fromEntries((
        multiple ? selectedItems : firstSelectedItem
    ).map((item) => [item.id, item]));
    const [multipleSelectedItemsObj, setMultipleSelectedItemsObj] = useState(
        selectedItemsObj
    );
    const getSelectLabel = () => {
        if (multiple) {
            return `Select items ${
                selectedItems.length > 0
                    ? `(${selectedItems.length} selected)`
                    : ''
            }`;
        }
        return (
            selectedItems.length > 0
                ? selectedItems[0].name
                : 'Select item'
        );
    };
    const selectItem = (id) => {
        if (multiple) {
            if (multipleSelectedItemsObj[id]) {
                delete multipleSelectedItemsObj[id];
            } else {
                multipleSelectedItemsObj[id] = itemsObj[id];
            }
            setMultipleSelectedItemsObj({
                ...multipleSelectedItemsObj
            });
        } else {
            setOpen(false);
            onSelect([itemsObj[id]]);
        }
    };
    const deleteItem = (id) => {
        delete selectedItemsObj[id];
        onSelect(Object.values(selectedItemsObj));
    };
    return (
        <View style={styles.container}>
            <Button
                icon="chevron-down"
                style={{
                    width: '100%'
                }}
                contentStyle={{
                    flexDirection: 'row-reverse',
                    paddingHorizontal: 10
                }}
                labelStyle={{
                    flexGrow: 1
                }}
                mode="outlined"
                uppercase={false}
                onPress={() => setOpen(true)}
            >
                {getSelectLabel()}
            </Button>
            {
                multiple ? (
                    <View style={styles.selectedItems}>
                        {Object.values(selectedItemsObj).map((item) => (
                            <Chip
                                key={item.id}
                                onClose={() => deleteItem(item.id)}
                                avatar={item.image ? ({
                                    uri: item.image
                                }) : null}
                                mode="outlined"
                                style={styles.selectedItem}
                            >
                                {item.name}
                            </Chip>
                        ))}
                    </View>
                ) : null
            }
            <Portal>
                <Modal
                    visible={open}
                    onDismiss={() => {
                        setMultipleSelectedItemsObj({
                            ...selectedItemsObj
                        });
                        setOpen(false);
                    }}
                    style={styles.modal}
                    contentContainerStyle={styles.modalContent}
                >
                    <ScrollView style={{ flexGrow: 1 }}>
                        <List.Section>
                            {
                                items.map((item) => (
                                    <List.Item
                                        key={item.id}
                                        title={item.name}
                                        left={(props) => (
                                            item.image ? (
                                                <Avatar.Image
                                                    {...props}
                                                    size={24}
                                                    source={{ uri: item.image }}
                                                />
                                            ) : null
                                        )}
                                        right={(props) => (
                                            multiple && multipleSelectedItemsObj[item.id] ? (
                                                <List.Icon {...props} icon="check" />
                                            ) : null
                                        )}
                                        onPress={() => {
                                            selectItem(item.id);
                                        }}
                                    />
                                ))
                            }
                        </List.Section>
                    </ScrollView>
                    {
                        multiple ? (
                            <Button
                                mode="contained"
                                onPress={() => {
                                    setOpen(false);
                                    onSelect(
                                        Object.values(multipleSelectedItemsObj)
                                    );
                                }}
                            >
                                Submit
                            </Button>
                        ) : null
                    }
                </Modal>
            </Portal>
        </View>
    );
}

const itemType = PropTypes.exact({
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    name: PropTypes.string,
    image: PropTypes.string
});

Select.propTypes = {
    items: PropTypes.arrayOf(itemType).isRequired,
    selectedItems: PropTypes.arrayOf(itemType).isRequired,
    onSelect: PropTypes.func.isRequired,
    multiple: PropTypes.bool
};

Select.defaultProps = {
    multiple: false
};
