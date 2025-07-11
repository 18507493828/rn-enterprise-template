import React from 'react';
import { View, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import { Badge, Divider, TextInner, Icon } from '@components/index';
import { COLORS, FONT_SIZES } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';

const Cell = ({
    style,
    isLine,
    linStyle,
    contentStyle,
    disabled,
    activeOpacity = 0.5,
    onPress,
    children,
    hide,
    touchableType = 'opacity',
    underlayColor = '#f0f0f0',
    iconName,
    iconStyle,
    iconSize = 24,
    iconColor = '#333',
    iconComponent,
    title = '', // 默认标题
    titleLines = 1,
    titleStyle,
    custInner,
    leftContainerStyle,
    subtitle,
    subIconName,
    subIconSize = 20,
    subIconColor = '#666',
    subStyle,
    onSubPress,
    isArrow = true,
    arrowIconName = 'chevron-right',
    arrowIconSize = 20,
    arrowIconColor = '#999',
    subInner,
    rightContainerStyle,
    badgeCount = 0,
    subValue,
    subValueStyle,
    subValueLines = 1,
    leftIconStyle,
    rightIconStyle,
}) => {
    if (hide) return null;

    // 渲染左侧内容
    const renderLeftContent = () => (
        <View style={[styles.beforeContainer, styles.row, leftContainerStyle]}>
            {iconComponent
                ? iconComponent
                : iconName && (
                      <Icon
                          name={iconName}
                          size={iconSize}
                          color={iconColor}
                          style={[styles.icon, leftIconStyle, iconStyle]}
                      />
                  )}
            {custInner ? (
                custInner
            ) : (
                <TextInner
                    numberOfLines={titleLines}
                    ellipsizeMode="tail"
                    style={[styles.title, titleStyle]}
                >
                    {title}
                </TextInner>
            )}
        </View>
    );

    // 渲染右侧内容
    const renderRightContent = () => (
        <View style={[styles.subContainer, styles.row, rightContainerStyle]}>
            {onSubPress && (
                <TouchableOpacity onPress={onSubPress}>
                    {subIconName ? (
                        <Icon
                            name={subIconName}
                            size={subIconSize}
                            color={subIconColor}
                            style={[styles.subIcon, rightIconStyle]}
                        />
                    ) : (
                        <TextInner numberOfLines={1} style={[styles.subtitle, subStyle]}>
                            {subtitle}
                        </TextInner>
                    )}
                </TouchableOpacity>
            )}
            {subValue && (
                <TextInner numberOfLines={subValueLines} style={[styles.subValue, subValueStyle]}>
                    {subValue}
                </TextInner>
            )}
            {badgeCount > 0 && (
                <Badge style={styles.badge} value={badgeCount < 100 ? badgeCount : '99+'}></Badge>
            )}
            {subInner
                ? subInner
                : isArrow && (
                      <Icon
                          name={arrowIconName}
                          size={arrowIconSize}
                          color={arrowIconColor}
                          style={[styles.arrow, rightIconStyle]}
                      />
                  )}
        </View>
    );

    const TouchableElement = touchableType === 'highlight' ? TouchableHighlight : TouchableOpacity;
    const touchableOptions = touchableType === 'highlight' ? { underlayColor } : {};

    return (
        <View style={[styles.container, style]}>
            <TouchableElement
                onPress={onPress}
                activeOpacity={onPress ? activeOpacity : 1}
                disabled={disabled}
                style={disabled ? { opacity: 0.5 } : {}}
                {...touchableOptions}
            >
                <View style={[styles.content, styles.row, contentStyle]}>
                    {children || (
                        <>
                            {renderLeftContent()}
                            {renderRightContent()}
                        </>
                    )}
                </View>
                {isLine && <Divider style={linStyle} />}
            </TouchableElement>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    beforeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: scaleSize(10),
    },
    title: {
        fontSize: FONT_SIZES.small,
        color: COLORS.black, // 默认黑色
    },
    subContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: FONT_SIZES.small,
        color: '#666',
    },
    subIcon: {
        marginRight: 5,
    },
    subValue: {
        fontSize: FONT_SIZES.xSmall,
        color: '#999',
        marginLeft: scaleSize(10),
    },
    badge: {
        marginLeft: scaleSize(10),
    },
    arrow: {
        marginLeft: scaleSize(5),
    },
    content: {
        padding: scaleSize(10),
    },
});

export default Cell;
