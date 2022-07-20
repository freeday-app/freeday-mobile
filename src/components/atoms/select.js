/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
    Avatar,
    Button,
    Portal,
    Modal,
    Chip,
    List
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Emoji from 'react-native-emoji';

import { useLanguage } from '../contexts/language.js';
import { useTheme } from '../contexts/theme.js';
import styles from './select.style.js';

export default function Select({
    multiple,
    items,
    selectedItems,
    onSelect,
    clearButton,
    mode
}) {
    const { getText } = useLanguage();
    const { themeData } = useTheme();
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
            return getText('button.selectItems');
        }
        return (
            selectedItems.length > 0
                ? selectedItems[0].name
                : getText('button.selectItem')
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
    const clear = () => {
        setOpen(false);
        onSelect([]);
    };
    const deleteItem = (id) => {
        delete selectedItemsObj[id];
        setMultipleSelectedItemsObj(selectedItemsObj);
        onSelect(Object.values(selectedItemsObj));
    };
    const getListItemLeft = (item, leftProps) => {
        if (item.image) {
            return (
                <Avatar.Image
                    {...leftProps}
                    size={24}
                    source={{ uri: item.image }}
                />
            );
        }
        if (item.icon) {
            return (
                <List.Icon
                    {...leftProps}
                    icon={item.icon}
                />
            );
        }
        if (item.emoji) {
            return (
                <Emoji name={item.emoji} />
            );
        }
        return null;
    };
    const getListItemRight = (item, props) => (
        multiple && multipleSelectedItemsObj[item.id] ? (
            <List.Icon {...props} icon="check" />
        ) : null
    );
    const getButtons = () => {
        if (multiple) {
            return (
                <Button
                    mode="contained"
                    style={styles.submitButton}
                    onPress={() => {
                        setOpen(false);
                        onSelect(
                            Object.values(multipleSelectedItemsObj)
                        );
                    }}
                >
                    {getText('button.submit')}
                </Button>
            );
        }
        if (clearButton) {
            return (
                <Button
                    mode="contained"
                    style={styles.submitButton}
                    onPress={() => clear()}
                >
                    {getText('button.clear')}
                </Button>
            );
        }
        return null;
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
                mode={mode}
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
                                avatar={<>{getListItemLeft(item, {})}</>}
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
                    contentContainerStyle={{
                        ...styles.modalContent,
                        backgroundColor: themeData.colors.background
                    }}
                >
                    <ScrollView style={styles.modalScroll}>
                        <List.Section>
                            {
                                items.map((item) => (
                                    <List.Item
                                        key={item.id}
                                        title={item.name}
                                        left={(props) => getListItemLeft(item, props)}
                                        right={(props) => getListItemRight(item, props)}
                                        onPress={() => {
                                            selectItem(item.id);
                                        }}
                                    />
                                ))
                            }
                        </List.Section>
                    </ScrollView>
                    {getButtons()}
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
    image: PropTypes.string,
    icon: PropTypes.string,
    emoji: PropTypes.string
});

Select.propTypes = {
    items: PropTypes.arrayOf(itemType).isRequired,
    selectedItems: PropTypes.arrayOf(itemType).isRequired,
    onSelect: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    clearButton: PropTypes.bool,
    mode: PropTypes.oneOf(['text', 'contained', 'outlined'])
};

Select.defaultProps = {
    multiple: false,
    clearButton: false,
    mode: 'outlined'
};
