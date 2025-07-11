import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientScrollView = ({ children, footerComponent, ...otherProps }) => {
    const [buttonOpacity] = useState(new Animated.Value(1));

    const handleScroll = event => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;

        // 动态调整按钮透明度
        Animated.timing(buttonOpacity, {
            toValue: distanceFromBottom <= 100 ? distanceFromBottom / 100 : 1,
            duration: 0,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            {/* 可滚动内容 */}
            <ScrollView
                style={styles.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                {...otherProps}
            >
                {children}
            </ScrollView>

            {/* 渐变遮罩 */}
            <LinearGradient
                colors={['transparent', 'rgba(255, 255, 255, 1)']}
                style={styles.gradient}
            />

            {/* 底部按钮 */}
            <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
                {footerComponent}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    gradient: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        height: 60,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GradientScrollView;
