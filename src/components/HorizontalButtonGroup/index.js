import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ClickableItem, TextInner } from '@components/index';
import { COLORS, DEFAULT_CONTAINER_SPACE, FONT_SIZES, FONT_WEIGHTS } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';

const HorizontalButtonGroup = ({
    label,
    labelStyle,
    buttons = [],
    onPress = () => {},
    style = {},
    isVisible = true,
    showCustomInner = false,
    children,
    defaultSelectedIndex = null, // 新增默认选中项
    error,
}) => {
    const [activeIndex, setActiveIndex] = useState(defaultSelectedIndex);

    // 如果 defaultSelectedIndex 更新，更新 activeIndex
    useEffect(() => {
        setActiveIndex(defaultSelectedIndex);
    }, [defaultSelectedIndex]);

    const handlePress = index => {
        setActiveIndex(index);
        onPress(index);
    };

    return isVisible ? (
        <View style={[styles.container, style]}>
            {/* 标签 */}
            {label && <TextInner style={[styles.label, labelStyle]}>{label}</TextInner>}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
                bounces={false} // 禁止滚动反弹
            >
                {showCustomInner
                    ? children
                    : buttons.map((button, index) => (
                          <ClickableItem
                              text={button}
                              key={index}
                              clickTimeOut={0}
                              style={[
                                  styles.button,
                                  {
                                      backgroundColor:
                                          activeIndex === index ? '#1D2023' : '#F3F3F3',
                                  },
                              ]}
                              textStyle={[
                                  styles.text,
                                  { color: activeIndex === index ? '#FFFFFF' : '#000000' },
                              ]}
                              onPress={() => handlePress(index)}
                          />
                      ))}
            </ScrollView>
            {error && <TextInner style={styles.errorText}>{error}</TextInner>}
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        marginTop: scaleSize(14),
    },
    scrollViewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
    label: {
        fontSize: FONT_SIZES.small,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: scaleSize(10),
        color: '#333',
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
    button: {
        minWidth: scaleSize(82),
        paddingHorizontal: scaleSize(8),
        marginRight: scaleSize(8),
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
    },
    text: {
        paddingVertical: scaleSize(10),
        fontSize: FONT_SIZES.xSmall,
        color: COLORS.black,
    },
    errorText: {
        color: 'red',
        fontSize: FONT_SIZES.xxSmall,
        marginTop: scaleSize(5),
        marginHorizontal: scaleSize(5),
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
});

export default HorizontalButtonGroup;
