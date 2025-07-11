import React from 'react';
import { View, Button, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useDerivedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

const VIP_LEVELS = [
    { id: 0, name: 'VIP0' },
    { id: 1, name: 'VIP1' },
    { id: 2, name: 'VIP2' },
];

const SimpleDemo = () => {
    const progress = useSharedValue(0);

    // 使用 useDerivedValue 计算当前 VIP 等级
    const levelName = useDerivedValue(() => {
        const index = Math.round(progress.value); // 取整，防止错误索引
        return VIP_LEVELS[index]?.name || 'VIP0'; // 避免数组越界
    });

    // 让 Animated.Text 触发 UI 更新
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(1, { duration: 200 }), // 透明度变化触发重绘
    }));

    const handleNext = () => {
        progress.value = withTiming((progress.value + 1) % VIP_LEVELS.length, {
            duration: 500,
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* 这里不使用 Animated.Text，而是普通 Text 组件，确保渲染 */}
            <Animated.View style={animatedStyle}>
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{levelName.value}</Text>
            </Animated.View>

            <Button title="Next Level" onPress={handleNext} />
        </View>
    );
};

export default SimpleDemo;
