import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DefaultView, TextInner } from '@components/index';
import { COLORS, FONT_SIZES, SPACING } from '@common/CommonStyle';
import { scaleSize, SCREEN_WIDTH } from '@utils/ScreenUtil';
import { useUserState } from '@lib/zustand';

export default function TransactionScreen({ navigation }) {
    const { userInfo } = useUserState(); // 获取用户信息
    // 每当 selectedIndex 改变时重新设置选项

    return (
        <DefaultView>
            <TextInner style={styles.titleText}>{userInfo?.currency ?? ''}</TextInner>
        </DefaultView>
    );
}

const styles = StyleSheet.create({
    iconCenter: {
        alignSelf: 'center',
        marginRight: scaleSize(5),
    },
    headerContainer: {
        paddingHorizontal: SPACING.medium,
    },
    actionSheetContent: {
        height: 300,
    },
    refreshableList: {
        // paddingVertical: scaleSize(20),
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.black,
        borderRadius: scaleSize(18),
        width: scaleSize(85),
        height: scaleSize(32),
    },
    nameStyle: {
        fontSize: FONT_SIZES.small,
        color: COLORS.black,
        fontWeight: '600',
    },
    content: {
        alignItems: 'center',
    },
    titleText: {
        fontWeight: '700',
        fontSize: scaleSize(32),
    },
    segmentedControl: {
        borderWidth: 1,
        borderColor: '#ECECEC',
    },
    btText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.xSmall,
    },
    segmentView: {
        width: SCREEN_WIDTH,
    },
});
