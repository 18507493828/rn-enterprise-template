import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import { FONT_SIZES, FONT_WEIGHTS } from '@common/CommonStyle';

const SegmentedControl = React.memo(
    ({
        values,
        selectedIndex,
        onChange,
        segmentedControlWidth = scaleSize(160), // 默认宽度
        segmentedControlHeight = scaleSize(30), // 默认高度
        borderRadius = 15, // 默认圆角半径
        activeBackgroundColor = '#ffffff', // 默认选中背景颜色
        inactiveBackgroundColor = '#F2F2F2', // 默认未选中背景颜色
        labelStyle, // 文本样式配置
        selectedLabelStyle, // 选中项的文本样式配置
        style,
    }) => {
        const internalPadding = scaleSize(4); // 内边距
        const adjustedWidth = segmentedControlWidth - internalPadding * 2; // 调整后的宽度
        const itemWidth = (adjustedWidth - internalPadding) / values.length; // 每个选项的宽度

        // 动画样式，用于移动选中项的背景
        const rStyle = useAnimatedStyle(() => {
            return {
                left: withTiming(itemWidth * selectedIndex + internalPadding / 2),
            };
        }, [selectedIndex, values, itemWidth]);

        return (
            <View
                style={[
                    styles.container,
                    {
                        width: adjustedWidth,
                        height: segmentedControlHeight,
                        borderRadius: borderRadius,
                        backgroundColor: inactiveBackgroundColor,
                        paddingLeft: internalPadding / 2,
                    },
                    style,
                ]}
            >
                {/* 选中项背景 */}
                <Animated.View
                    style={[
                        {
                            width: itemWidth,
                            height: segmentedControlHeight * 0.8,
                            top: segmentedControlHeight * 0.1,
                            borderRadius: borderRadius,
                            backgroundColor: activeBackgroundColor,
                        },
                        rStyle,
                        styles.activeBox,
                    ]}
                />
                {/* 渲染每个选项 */}
                {values.map((value, index) => {
                    const isSelected = selectedIndex === index;

                    return (
                        <TouchableOpacity
                            onPress={() => {
                                onChange?.(index);
                            }}
                            key={value}
                            style={[
                                {
                                    width: itemWidth,
                                },
                                styles.labelContainer,
                            ]}
                        >
                            <TextInner
                                style={[
                                    styles.label,
                                    labelStyle,
                                    isSelected ? selectedLabelStyle : {}, // Apply selectedLabelStyle if selected
                                ]}
                            >
                                {value}
                            </TextInner>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    activeBox: {
        position: 'absolute',
    },
    labelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: FONT_SIZES.xSmall,
        fontWeight: FONT_WEIGHTS.bold,
    },
});

export default SegmentedControl;
