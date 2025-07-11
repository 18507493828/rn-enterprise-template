import { COMMON_STYLES, FONT_SIZES } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import { Icon } from '@components/index';

const { width, height } = Dimensions.get('window');

const ToastContainer = ({
    message, // Toast 内容
    iconName = 'info', // 图标名称
    iconColor = '#fff', // 图标颜色
    duration = 2000, // 显示时长
    onClose, // 关闭回调
}) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // 动画状态

    useEffect(() => {
        // 显示动画
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // 自动关闭
        const timeout = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => onClose && onClose());
        }, duration);

        return () => clearTimeout(timeout);
    }, [fadeAnim, duration, onClose]);

    return (
        <View style={COMMON_STYLES.centerVertically}>
            <View style={[COMMON_STYLES.center]}>
                <Animated.View
                    style={[
                        [styles.toast, { maxWidth: width * 0.5 }],
                        {
                            opacity: fadeAnim,
                            transform: [
                                {
                                    scale: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.8, 1],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Icon
                        name={iconName}
                        size={scaleSize(25)}
                        color={iconColor}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>{message}</Text>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    toast: {
        // maxWidth: scaleSize(200),
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: scaleSize(20),
        paddingVertical: scaleSize(10),
        borderRadius: scaleSize(8),
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    text: {
        color: '#fff',
        fontSize: FONT_SIZES.xxSmall,
        // marginTop: scaleSize(5),
        textAlign: 'center',
        fontWeight: '600',
    },
    icon: {
        marginBottom: 10,
    },
});

export default ToastContainer;
