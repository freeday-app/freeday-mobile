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
import 'intl/locale-data/jsonp/fr.js';

import FreedayLogo from '../../assets/logo.png';
import FreedayLogoDark from '../../assets/logo-dark.png';
import Types from '../../helpers/types.js';

import styles from './page.style.js';

function Page({
    theme,
    children,
    scroll,
    loading,
    title,
    preTitle,
    postTitle,
    titleAction
}) {
    const { dark } = theme;
    const contentHeader = (preTitle || title || postTitle) ? (
        <View style={styles.contentHeader}>
            {preTitle ? (
                <View style={styles.contentHeaderRow}>
                    <Text style={styles.subTitle}>
                        {preTitle}
                    </Text>
                </View>
            ) : null}
            {title ? (
                <View style={styles.contentHeaderRow}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    {titleAction ? (
                        <View style={styles.titleAction}>
                            {titleAction}
                        </View>
                    ) : null}
                </View>
            ) : null}
            {postTitle ? (
                <View style={styles.contentHeaderRow}>
                    <Text style={styles.subTitle}>
                        {preTitle}
                    </Text>
                </View>
            ) : null}
        </View>
    ) : null;
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
            <Appbar.Header
                style={{
                    backgroundColor: 'transparent'
                }}
            >
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
            </Appbar.Header>
            {contentHeader}
            {content}
        </View>
    );
}

Page.propTypes = {
    theme: Types.theme.isRequired,
    loading: PropTypes.bool,
    children: Types.children.isRequired,
    scroll: PropTypes.bool,
    title: PropTypes.string,
    preTitle: PropTypes.string,
    postTitle: PropTypes.string,
    titleAction: Types.children
};

Page.defaultProps = {
    loading: false,
    scroll: false,
    title: null,
    preTitle: null,
    postTitle: null,
    titleAction: null
};

export default withTheme(Page);
