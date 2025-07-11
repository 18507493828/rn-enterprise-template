import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { scaleSize } from '@utils/ScreenUtil';

// 将 renderItem 中的动画逻辑封装到单独组件中
const ParallaxCarouselItem = ({ item, animationValue, renderItem }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            animationValue.value,
            [-1, 0, 1],
            [0.9, 1, 0.9],
            Extrapolate.CLAMP,
        );
        const opacity = interpolate(
            Math.abs(animationValue.value),
            [0, 1],
            [1, 0.3],
            Extrapolate.CLAMP,
        );
        return { transform: [{ scale }], opacity };
    });

    return (
        <Animated.View style={[styles.itemContainer, animatedStyle]}>
            {renderItem({ item })}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default memo(ParallaxCarouselItem);
