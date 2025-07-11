import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';

/**
 * Badge 角标组件
 *
 * @param {React.ReactNode} children 子组件，可以在角标上嵌套其他组件
 * @param {string|number} value 角标的内容，可以是数字或文本
 * @param {string|number} height 圆角高度
 * @param {object} containerStyle 包裹组件的样式
 * @param {object} badgeStyle 角标的样式
 * @param {string} backgroundColor 角标的背景颜色
 * @param {string} textColor 角标文本颜色
 * @param {boolean} hidden 是否隐藏角标
 * @param {object} position 自定义角标的位置（top, right）
 */
const Badge = ({
    children,
    value,
    containerStyle,
    badgeStyle,
    fontWeight = 'normal',
    backgroundColor = 'red',
    textColor = 'white',
    hidden = false,
    fontSize = scaleSize(10),
    position = { top: -10, right: -10 },
}) => {
    // 如果隐藏，则返回子组件
    if (hidden) {
        return <View style={containerStyle}>{children}</View>;
    }

    let badgeValue = value;
    if (parseInt(value) > 99) {
        badgeValue = `${value}+`;
    }
    return (
        <View style={[styles.container, containerStyle]}>
            {children}
            <View
                style={[
                    styles.badge,
                    {
                        minWidth: scaleSize(16),
                        borderRadius: scaleSize(8),
                        backgroundColor: backgroundColor,
                        top: position.top,
                        right: position.right,
                    },
                    badgeStyle,
                ]}
            >
                {badgeValue !== undefined && (
                    <TextInner style={{ fontSize, color: textColor, fontWeight }}>
                        {badgeValue}
                    </TextInner>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleSize(16),
    },
});

export default Badge;
