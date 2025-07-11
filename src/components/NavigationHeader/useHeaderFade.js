import { useEffect, useCallback } from 'react';
import { StatusBar, Platform } from 'react-native';
import {
    useAnimatedReaction,
    interpolateColor,
    interpolate,
    runOnJS,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

/**
 * 计算 header 背景和状态栏透明度（简单线性插值）
 * 当滚动值在 0～100 之间时，透明度从 0 变为 1
 * @param {number} value 当前 scrollY 值
 * @returns {Object} 包含 bgColor 和 statusOpacity
 */
const getHeaderColors = value => {
    const clamped = Math.min(100, Math.max(0, value));
    const alpha = clamped / 100;
    return {
        bgColor: `rgba(255,255,255,${alpha})`,
        statusOpacity: alpha,
    };
};

const useHeaderFade = ({ navigation, scrollY, navigationOptions = {} }) => {
    // 将更新函数独立出来，确保 runOnJS 包裹的是方法调用
    const updateHeaderBackground = bgColor => {
        navigation.setOptions({
            headerStyle: { backgroundColor: bgColor },
        });
    };

    const updateStatusBar = opacity => {
        Platform.OS === 'android' &&
            StatusBar.setBackgroundColor(`rgba(255,255,255,${opacity})`, true);
    };

    // Worklet 中根据 scrollY.value 进行动态计算
    useAnimatedReaction(
        () => scrollY.value,
        value => {
            'worklet';
            const bgColor = interpolateColor(
                value,
                [0, 100],
                ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
            );
            const statusBarOpacity = interpolate(value, [0, 100], [0, 1]);
            // 使用 runOnJS 更新 header 和状态栏
            runOnJS(updateHeaderBackground)(bgColor);
            runOnJS(updateStatusBar)(statusBarOpacity);
        },
        [],
    );

    // 初始设置 header 为透明
    useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'transparent' },
            headerTransparent: true,
            ...navigationOptions,
        });

        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('rgba(255,255,255,0)', true);
        }
    }, [navigation, navigationOptions]);

    // 使用 useFocusEffect，当页面获得焦点时，根据当前 scrollY 值更新 header 和状态栏
    useFocusEffect(
        useCallback(() => {
            // 获取当前滚动值，计算颜色
            const currentValue = scrollY.value;
            const { bgColor, statusOpacity } = getHeaderColors(currentValue);
            updateHeaderBackground(bgColor);
            updateStatusBar(statusOpacity);
            return () => {};
        }, [navigation, scrollY]),
    );
};

export default useHeaderFade;
