import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scaleSize, SCREEN_WIDTH } from '@utils/ScreenUtil';
import { COLORS, COMMON_STYLES, FONT_WEIGHTS } from '@common/CommonStyle';
import { useTranslation } from 'react-i18next';

const SegmentUnderLine = (
    {
        values,
        selectedIndex,
        onChange,
        itemWidth = SCREEN_WIDTH * 0.2,
        underLineTop = scaleSize(8),
        borderRadius = 15, // 默认圆角半径
        activeBackgroundColor = COLORS.primary, // 默认选中背景颜色
        labelStyle, // 文本样式配置
        selectedLabelStyle, // 选中项的文本样式配置
        style,
    },
    ref,
) => {
    const { t } = useTranslation();
    const translateX = useSharedValue(0);
    const scrollRef = useRef();
    const scale = useSharedValue(1); // 默认缩放值
    const underlineTranslateX = useSharedValue(selectedIndex * itemWidth);

    const underlineAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: underlineTranslateX.value }],
        };
    });

    // 动画样式，用于移动选中项的背景
    const handleTabPress = index => {
        translateX.value = withSpring(index, {
            damping: 10, // 控制阻尼，值越大弹跳感越少
            stiffness: 100, // 控制弹性，值越大速度越快
            mass: 1, // 质量，影响惯性
        });
        underlineTranslateX.value = withSpring(index * itemWidth, {
            damping: 15,
            stiffness: 120,
        });
    };

    useImperativeHandle(ref, () => ({
        scollViewWithIndex: index => {
            scrollRef?.current?.scrollTo({
                x: itemWidth * index,
                animated: true,
            });
            handleTabPress(index);
            onChange?.(index);
        },
    }));

    // 动画效果：点击时图标放大
    const handlePressIn = () => {
        scale.value = withSpring(1.2, { damping: 2, stiffness: 100 }); // 放大
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 2, stiffness: 100 }); // 恢复原始大小
    };

    const setIndex = (index, bl = true) => {
        scrollRef?.current?.scrollTo({
            x: itemWidth * index,
            animated: bl,
        });
    };

    return (
        <View style={[styles.container, { height: scaleSize(30) }, style]}>
            <ScrollView
                scrollEnabled={values.length > 5}
                ref={scrollRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ justifyContent: 'center' }}>
                    <View style={COMMON_STYLES.flexBtwNoScale}>
                        {values.map((value, index) => {
                            const isSelected = selectedIndex === index;
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPressIn={handlePressIn}
                                    onPressOut={handlePressOut}
                                    onPress={() => {
                                        setIndex(index);
                                        handleTabPress(index);
                                        onChange?.(index);
                                    }}
                                    key={index}
                                    style={[
                                        {
                                            width: itemWidth,
                                        },
                                        styles.labelContainer,
                                    ]}
                                >
                                    <Animated.Text
                                        style={[
                                            styles.label,
                                            labelStyle,
                                            isSelected ? selectedLabelStyle : {},
                                            {
                                                fontWeight: isSelected
                                                    ? FONT_WEIGHTS.bold
                                                    : FONT_WEIGHTS.regular,
                                            },
                                        ]}
                                    >
                                        {t(value)}
                                    </Animated.Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <Animated.View
                        style={[
                            {
                                marginTop: underLineTop,
                                width: itemWidth * 0.42,
                                height: scaleSize(2),
                                backgroundColor: activeBackgroundColor,
                                borderRadius: borderRadius,
                                marginLeft: itemWidth * 0.28,
                            },
                            underlineAnimatedStyle,
                        ]}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeBox: {
        // height: scaleSize(20),
    },
    labelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        // height: scaleSize(25),
        color: COLORS.primary,
    },
    underLine: {},
});

export default forwardRef(SegmentUnderLine);
