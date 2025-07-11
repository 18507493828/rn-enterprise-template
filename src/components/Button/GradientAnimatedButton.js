import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { TextInner, Touchable } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';

const GradientAnimatedButton = ({
    title,
    onPress = () => {},
    gradientColors,
    animatedBackground,
    disabled,
    activeOpacity = 0.7,
    style,
    titleStyle,
    isVisible = true,
    borderStyle = { borderRadius: 16 },
}) => {
    return isVisible ? (
        <Touchable
            onPress={() => !disabled && onPress()}
            style={[styles.buttonContainer, borderStyle, style, disabled && styles.disabledBtn]} // 合并外部传入的样式
            activeOpacity={disabled ? 0.5 : activeOpacity}
        >
            <Animated.View style={[animatedBackground, borderStyle]}>
                <LinearGradient colors={gradientColors} style={[styles.gradient, borderStyle]}>
                    <TextInner style={[styles.buttonText, titleStyle]}>{title}</TextInner>
                </LinearGradient>
            </Animated.View>
        </Touchable>
    ) : null;
};

const styles = StyleSheet.create({
    buttonContainer: {
        overflow: 'hidden',
    },
    gradient: {
        width: 'auto',
        height: 'auto',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: scaleSize(14),
        padding: scaleSize(6),
    },
    disabledBtn: {
        opacity: 0.5,
    },
});

export default GradientAnimatedButton;
