import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    View,
    StyleSheet,
    Dimensions,
    Easing,
    SafeAreaView,
    Platform,
} from 'react-native';

const { height, width } = Dimensions.get('window');

const ModalContent = ({
    onClose, // 关闭时触发的回调
    duration = 300, // 动画持续时间（毫秒）
    modalStyle = {}, // Modal 自定义样式
    animationType = 'slide', // 动画类型：'slide', 'fade', 'zoom'
    children, // 子组件内容
}) => {
    const translateY = useRef(new Animated.Value(height)).current; // 用于滑动动画
    const opacity = useRef(new Animated.Value(0)).current; // 用于淡入淡出动画
    const scale = useRef(new Animated.Value(0)).current; // 用于缩放动画
    const [isVisible, setIsVisible] = useState(true); // 控制 Modal 的显示状态

    // 初始化动画
    useEffect(() => {
        let animation;
        if (animationType === 'slide') {
            animation = Animated.timing(translateY, {
                toValue: 0,
                duration,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            });
        } else if (animationType === 'fade') {
            animation = Animated.timing(opacity, {
                toValue: 1,
                duration,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            });
        } else if (animationType === 'zoom') {
            animation = Animated.timing(scale, {
                toValue: 1,
                duration,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            });
        }

        animation?.start();
    }, [animationType]);

    // 关闭动画
    const handleClose = () => {
        let animation;
        if (animationType === 'slide') {
            animation = Animated.timing(translateY, {
                toValue: height,
                duration,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            });
        } else if (animationType === 'fade') {
            animation = Animated.timing(opacity, {
                toValue: 0,
                duration,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            });
        } else if (animationType === 'zoom') {
            animation = Animated.timing(scale, {
                toValue: 0,
                duration,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            });
        }

        animation?.start(() => {
            setIsVisible(false);
            onClose?.();
        });
    };

    if (!isVisible) return null;

    // 动画样式
    const animationStyle = {
        slide: { transform: [{ translateY }] },
        fade: { opacity },
        zoom: { transform: [{ scale }] },
    }[animationType];

    return (
        <Animated.View style={[styles.modal, animationStyle, modalStyle]}>
            <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden', // 防止内容溢出
        minHeight: 200,
    },
    safeArea: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 16 : 0, // 适配 iOS 安全区域
    },
});

export default ModalContent;
