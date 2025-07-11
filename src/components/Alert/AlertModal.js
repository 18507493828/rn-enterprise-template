import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Image,
    BackHandler,
    StatusBar,
} from 'react-native';
import { Icon, TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from '@common/CommonStyle';
import { useTranslation } from 'react-i18next';

const AlertModal = ({
    title,
    content,
    children,
    contentComponent,
    buttons = [],
    onConfirm = () => {},
    onCancel = () => {},
    onClose = () => {},
    isVisible,
    source,
    iconName,
    titleSource,
    modalStyle = {},
    contentStyle = {},
    imageStyle = {},
    iconColor = '',
    overlayStyle = {},
    showOverlay = true, // 新增，控制是否显示遮罩层
    disableBackHandler = false, // 禁止物理键返回
    onlyShowConfirm = false, //  只显示一个确认按钮
}) => {
    const { t } = useTranslation();
    const [fadeAnim] = useState(new Animated.Value(0));
    const [translateY] = useState(new Animated.Value(30));

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }

        // 物理返回键监听
        const backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => {
            // 禁止返回键的默认行为
            if (disableBackHandler) {
                return true; // 返回 true 阻止返回键，返回 false 允许返回
            }

            // 如果不禁用返回键，则执行关闭逻辑
            onClose();
            return true;
        });

        // 在组件卸载时移除返回键监听
        return () => {
            backHandlerListener.remove();
        };
    }, [isVisible, disableBackHandler]);

    const defaultButtons = [
        {
            text: t('cancel'),
            onPress: onCancel,
            textStyle: styles.cancelButtonText,
        },
        {
            text: t('confirm'),
            onPress: onConfirm,
            textStyle: styles.confirmButtonText,
        },
    ];

    // 只保留确定按钮
    onlyShowConfirm && defaultButtons.splice(0, 1);

    const renderButtons = () => {
        const btns = buttons.length > 0 ? buttons : defaultButtons;
        return (
            <View style={styles.buttonsContainer}>
                {btns.map((button, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <View style={styles.buttonDivider} />}
                        <TouchableOpacity
                            style={[styles.button]}
                            onPress={() => {
                                button.onPress?.();
                                onClose();
                            }}
                        >
                            <TextInner style={[styles.buttonText, button.textStyle]}>
                                {button.text}
                            </TextInner>
                        </TouchableOpacity>
                    </React.Fragment>
                ))}
            </View>
        );
    };

    return isVisible ? (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalContainer}
        >
            {/* 设置安卓弹框状态栏透明*/}
            <StatusBar
                backgroundColor={COLORS.transparent}
                translucent={Platform.OS === 'android'}
            />
            {/* 根据 showOverlay 决定是否显示遮罩层 */}
            {showOverlay && <View style={[styles.overlay, overlayStyle]} />}
            <Animated.View
                style={[
                    styles.modalContent,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY }],
                    },
                    modalStyle,
                ]}
            >
                {titleSource && <Image source={titleSource} style={[styles.image, imageStyle]} />}
                {title && <TextInner style={styles.title}>{title}</TextInner>}
                {source && <Image source={source} style={[styles.image, imageStyle]} />}
                {iconName && <Icon name={iconName} color={iconColor} style={[styles.image]} />}
                {content && <TextInner style={[styles.content, contentStyle]}>{content}</TextInner>}
                {contentComponent && <View style={styles.customContent}>{contentComponent}</View>}
                {renderButtons()}
            </Animated.View>
            {children}
        </KeyboardAvoidingView>
    ) : null;
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 9999,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        width: scaleSize(300),
        borderRadius: 10,
        paddingTop: scaleSize(20),
        alignItems: 'center',
    },
    title: {
        fontSize: FONT_SIZES.small,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: scaleSize(10),
        color: COLORS.black,
        textAlign: 'center',
    },
    content: {
        fontSize: FONT_SIZES.xSmall,
        color: '#4F4F4F',
        marginBottom: scaleSize(20),
        marginHorizontal: scaleSize(20),
        textAlign: 'center',
        lineHeight: 20,
    },
    image: {
        marginBottom: scaleSize(10),
    },
    customContent: {
        marginBottom: scaleSize(20),
        width: '100%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: scaleSize(10),
        borderTopWidth: 0.5,
        borderTopColor: '#D1D1D6',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scaleSize(15),
    },
    buttonDivider: {
        width: 0.5,
        backgroundColor: '#D1D1D6',
        height: '100%',
    },
    buttonText: {
        fontSize: FONT_SIZES.small,
        color: '#000',
        fontWeight: '400',
    },
    confirmButtonText: {
        fontWeight: FONT_WEIGHTS.bold,
    },
    cancelButtonText: {
        fontWeight: '400',
        color: COLORS.textSecondary,
    },
});

export default AlertModal;
