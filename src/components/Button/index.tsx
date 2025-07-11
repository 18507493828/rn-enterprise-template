import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    View,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from 'react-native';
import { COLORS, BORDER_RADIUS } from '@common/CommonStyle';
import { TextInner, Icon } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import CommonMethods from '@utils/CommonMethods';

type Style = ViewStyle | TextStyle | ImageStyle | any;

interface Props {
    title?: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean; //是否显示加载视图
    style?: Style;
    textStyle?: Style;
    icon?: string;
    iconPosition?: string; // 'left' or 'right'
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    fontSize?: number;
    paddingVertical?: number;
    iconSize?: number;
    iconColor?: string;
    leftIconContainer?: Style;
    rightIconContainer?: Style;
    activeOpacity?: number;
    isVisible?: boolean; //是否显示
    containerStyle?: Style;
    clickTimeOut?: number; //设置按钮防止重复点击时差（单位ms）
}

const Button = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    style,
    textStyle = {},
    icon,
    iconPosition = 'left',
    backgroundColor = COLORS.primary,
    textColor = '#FFFFFF',
    borderRadius = BORDER_RADIUS.xLarge,
    fontSize = scaleSize(16),
    paddingVertical = scaleSize(12),
    iconSize = 18,
    iconColor,
    leftIconContainer,
    rightIconContainer,
    activeOpacity = 0.7,
    isVisible = true,
    containerStyle,
    clickTimeOut = 500,
}: Props) => {
    const isDisabled = disabled || loading;

    return isVisible ? (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: isDisabled ? COLORS.disable : backgroundColor,
                    borderRadius,
                    paddingVertical,
                },
                style,
            ]}
            onPress={() => {
                CommonMethods.noDoubleClick(() => {
                    !isDisabled ? onPress && onPress() : null;
                }, clickTimeOut);
            }}
            activeOpacity={isDisabled ? 1 : activeOpacity}
        >
            <View style={styles.content}>
                {loading && (
                    <ActivityIndicator
                        size="small"
                        color={textColor}
                        style={styles.leftIconContainer}
                    />
                )}
                {icon && iconPosition === 'left' && (
                    <View style={[styles.leftIconContainer, leftIconContainer]}>
                        <Icon name={icon} size={iconSize} color={iconColor || textColor} />
                    </View>
                )}
                <TextInner style={[{ color: textColor, fontSize }, textStyle]}>{title}</TextInner>
                {icon && iconPosition === 'right' && (
                    <View style={[styles.rightIconContainer, rightIconContainer]}>
                        <Icon name={icon} size={iconSize} color={iconColor || textColor} />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    ) : null;
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftIconContainer: {
        marginRight: scaleSize(5),
    },
    rightIconContainer: {
        marginLeft: scaleSize(5),
    },
});

export default Button;
