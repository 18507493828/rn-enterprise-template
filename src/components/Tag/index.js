import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInner, Icon } from '@components/index';

const Tag = ({
    title,
    style,
    textStyle,
    backgroundColor = '#f1f1f1',
    textColor = '#333',
    borderColor = '#ddd',
    icon = null,
    iconPosition = 'right', // 'left' or 'right'
    onPress = null,
    onRemove = null,
    removeIcon = 'close',
    borderRadius = 20,
    paddingVertical = 5,
    paddingHorizontal = 10,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor,
                    borderColor,
                    borderRadius,
                    paddingVertical,
                    paddingHorizontal,
                },
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {icon && iconPosition === 'left' && (
                <Icon name={icon} size={16} color={textColor} style={styles.icon} />
            )}
            <TextInner style={[styles.text, { color: textColor }, textStyle]}>{title}</TextInner>
            {onRemove && (
                <TouchableOpacity onPress={onRemove} style={styles.removeIcon}>
                    <Icon name={removeIcon} size={16} color={textColor} />
                </TouchableOpacity>
            )}
            {icon && iconPosition === 'right' && (
                <Icon name={icon} size={16} color={textColor} style={styles.icon} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        margin: 5,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
    },
    icon: {
        marginRight: 5,
    },
    removeIcon: {
        marginLeft: 5,
    },
});

export default Tag;
