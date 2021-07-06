import React from 'react';
import {
    View,
    ScrollView,
    Image
} from 'react-native';
import {
    Appbar,
    Text,
    ActivityIndicator,
    withTheme
} from 'react-native-paper';
import PropTypes from 'prop-types';
import 'intl';
import 'intl/locale-data/jsonp/en.js';

import FreedayLogo from '../../assets/freeday-logo.png';
import FreedayLogoDark from '../../assets/freeday-logo-dark.png';
import { useFilter } from '../contexts/filter.js';
import Types from '../../helpers/types.js';

import styles from './page.style.js';

function Page({
    theme,
    children,
    scroll,
    filter,
    loading
}) {
    const { dark, colors } = theme;
    const { showFilter } = useFilter();
    let content = null;
    if (loading) {
        content = (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else if (scroll) {
        content = (
            <ScrollView style={styles.content}>
                {children}
            </ScrollView>
        );
    } else {
        content = (
            <View style={styles.content}>
                {children}
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content
                    title={(
                        <View style={styles.headerTitle}>
                            <Image
                                source={dark ? FreedayLogoDark : FreedayLogo}
                                style={styles.headerTitleLogo}
                            />
                            <Text style={styles.headerTitleText}>
                                Freeday
                            </Text>
                        </View>
                    )}
                />
                {filter ? (
                    <>
                        <Appbar.Action
                            icon="filter"
                            onPress={() => showFilter()}
                            color={colors.text}
                        />
                    </>
                ) : null}
            </Appbar.Header>
            {content}
        </View>
    );
}

Page.propTypes = {
    theme: Types.theme.isRequired,
    loading: PropTypes.bool,
    children: Types.children.isRequired,
    scroll: PropTypes.bool,
    filter: PropTypes.bool
};

Page.defaultProps = {
    loading: false,
    scroll: false,
    filter: false
};

export default withTheme(Page);
