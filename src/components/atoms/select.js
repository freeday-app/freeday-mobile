import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Portal, Modal, Chip } from 'react-native-paper';
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
    selectedItems: {
        width: '100%'
    }
});

function Select({
    items,
    selectedItems,
    multiple,
    onSelect
}) {
    const [open, setOpen] = useState(false);
    return (
        <View style={styles.container}>
            <Button
                mode="text"
                uppercase={false}
                onPress={() => setOpen(true)}
            >
                {selectedItems.length > 0 ? (
                    `${selectedItems.length} items selected`
                ) : 'Select items'}
            </Button>
            <View style={styles.selectedItems}>
                {selectedItems.map((item) => (
                    <Chip
                        key={item.id}
                        icon="information"
                        onClose={() => {}}
                    >
                        Example Chip
                    </Chip>
                ))}
            </View>
            <Portal>
                <Modal
                    visible={open}
                    onDismiss={() => setOpen(false)}
                    style={styles.modal}
                    contentContainerStyle={styles.modalContent}
                >
                    {/*  */}
                </Modal>
            </Portal>
        </View>
    );
}

const itemType = PropTypes.exact({
    id: PropTypes.oneOf(
        PropTypes.string,
        PropTypes.number
    ),
    name: PropTypes.string,
    image: PropTypes.string
});

Select.propTypes = {
    items: PropTypes.arrayOf(itemType).isRequired,
    selectedItems: PropTypes.arrayOf(itemType).isRequired,
    onSelect: PropTypes.func.isRequired
};

export default {
    Select
};
