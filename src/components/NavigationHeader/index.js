import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Header, HeaderTitle, HeaderBackButton } from '@react-navigation/elements';
import { TextInner } from '@components/index';
import { COMMON_STYLES } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NavigationHeader = ({
    title = '',
    leftItems = [], // 左侧内容：图标或文本
    rightItems = [], // 右侧内容：图标或文本
    headerHeight = 60,
    backgroundColor = '#fff',
    titleStyle = {},
    containerStyle = {},
    statusBarStyle = 'dark-content',
}) => {
    // 获取安全区域
    const insets = useSafeAreaInsets();
    return (
        <>
            <StatusBar backgroundColor={backgroundColor} barStyle={statusBarStyle} />
            <Header
                style={[styles.header, { height: insets.top, backgroundColor }, containerStyle]}
            >
                <View style={[styles.leftContainer, COMMON_STYLES.headerLeftContainer]}>
                    {leftItems.map((item, index) => (
                        <TouchableOpacity
                            key={`left-item-${index}`}
                            onPress={item.onPress}
                            style={styles.iconContainer}
                        >
                            {item.component ? (
                                item.component
                            ) : (
                                <Text style={[styles.itemText, item.style]}>{item.label}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <HeaderTitle style={[styles.title, titleStyle]}>{title}</HeaderTitle>

                <View style={[styles.rightContainer, COMMON_STYLES.headerRightContainer]}>
                    {rightItems.map((item, index) => (
                        <TouchableOpacity
                            key={`right-item-${index}`}
                            onPress={item.onPress}
                            style={styles.iconContainer}
                        >
                            {item.component ? (
                                item.component
                            ) : (
                                <TextInner style={[styles.itemText, item.style]}>
                                    {item.label}
                                </TextInner>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </Header>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        color: '#333',
    },
    iconContainer: {
        marginHorizontal: scaleSize(8),
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
});

export default NavigationHeader;
