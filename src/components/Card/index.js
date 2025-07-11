import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { scaleSize } from '@utils/ScreenUtil';
import { TextInner, Icon } from '@components/index';
import { BORDER_RADIUS, COLORS } from '@common/CommonStyle';

// Card 组件
const Card = ({
    title,
    icon,
    children,
    style,
    titleStyle,
    headerStyle,
    contentStyle,
    iconPosition = 'left', // iconPosition 为 'left' 或 'right'
    iconStyle,
    showShadow = false,
}) => {
    return (
        <Animated.View style={[styles.card, showShadow && shadow, style]}>
            <View style={[styles.header, headerStyle]}>
                {icon && iconPosition === 'left' && (
                    <Icon name={icon} size={24} color="#000" style={[styles.icon, iconStyle]} />
                )}
                {title && <TextInner style={[styles.title, titleStyle]}>{title}</TextInner>}
                {icon && iconPosition === 'right' && (
                    <Icon name={icon} size={24} color="#000" style={[styles.icon, iconStyle]} />
                )}
            </View>
            <View style={[styles.content, contentStyle]}>{children}</View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        padding: scaleSize(15),
        borderRadius: BORDER_RADIUS.medium,
    },
    shadow: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3, // Android的阴影
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: scaleSize(18),
        fontWeight: 'bold',
        color: '#333',
        flex: 1, // 使标题占据空间以便两侧图标不会互相挤压
    },
    icon: {
        marginHorizontal: scaleSize(5),
    },
    content: {
        paddingTop: scaleSize(5),
    },
});

export default Card;
