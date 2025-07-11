import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { DefaultView, ClickableItem, StickyScrollView, Badge, TextInner } from '@components/index';
import {
    COLORS,
    FONT_SIZES,
    COMMON_STYLES,
    DEFAULT_TOP_SPACE,
    BORDER_RADIUS,
    FONT_WEIGHTS,
} from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';
import { SceneTask } from '@view/common/SceneManager';
import { useTranslation } from 'react-i18next';
import { useUserState } from '@lib/zustand';

const HomeScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { userInfo } = useUserState();
    // 执行升级任务
    SceneTask.executeUpgradeTasks();

    useEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => <ClickableItem icon="menu" onPress={onPressMenu} />,
            headerLeftContainerStyle: COMMON_STYLES.headerLeftContainer,
            headerRightContainerStyle: COMMON_STYLES.headerRightContainer,
        });
    }, [navigation]);

    /**
     * 点击左侧菜单按钮
     */
    const onPressMenu = () => {
        userInfo?.id ? navigation.openDrawer() : navigation.navigate('LoginScreen');
    };

    return (
        <DefaultView>
            <TextInner>首页</TextInner>
        </DefaultView>
    );
};

const styles = StyleSheet.create({
    container: { ...COMMON_STYLES.container },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: DEFAULT_TOP_SPACE,
        marginBottom: scaleSize(33),
    },
    chatBtn: {
        width: scaleSize(68),
        paddingVertical: scaleSize(6),
        backgroundColor: '#F0F0F0',
        borderRadius: BORDER_RADIUS.small,
    },
    chatBtnText: {
        fontSize: FONT_SIZES.xSmall,
        color: COLORS.primary,
        fontWeight: FONT_WEIGHTS.bold,
    },
    carouselContainer: {
        marginBottom: scaleSize(12),
        borderRadius: BORDER_RADIUS.medium,
    },
    badgeStyle: {
        marginRight: scaleSize(4),
        marginTop: scaleSize(4),
    },
    messageImage: {
        width: 22,
        height: 22,
    },
});

export default HomeScreen;
