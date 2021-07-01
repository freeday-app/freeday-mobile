import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center'
    },
    scrollContainer: {
        width: '100%'
    },
    scrollContent: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: 25
    }
});

export default function Page({ children, filter, onFilter }) {
    return (
        <View style={styles.container}>
            <Header
                // leftComponent={{
                //     //
                // }}
                centerComponent={{
                    text: 'Freeday',
                    style: {
                        color: 'white',
                        fontSize: 20
                    }
                }}
                rightComponent={
                    filter ? (
                        <FontAwesome
                            name="filter"
                            size={25}
                            color="white"
                            onPress={onFilter}
                        />
                    ) : null
                }
            />
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
            >
                {children}
            </ScrollView>
        </View>
    );
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
    filter: PropTypes.bool,
    onFilter: PropTypes.func
};

Page.defaultProps = {
    filter: false,
    onFilter: () => {}
};
