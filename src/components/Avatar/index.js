import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { TextInner, Icon } from '@components/index';

/**
 * Avatar 组件
 * @param {number} size - 头像的尺寸 (宽和高相等)
 * @param {object|number} source - 图片资源对象或 require 引用
 * @param {string} placeholder - 占位字符，图片缺失时展示
 * @param {string} icon - 图标名称，用于显示图标
 * @param {string} backgroundColor - 背景色，默认灰色
 * @param {string} textColor - 占位字符的颜色，默认白色
 * @param {string} iconColor - 图标颜色，默认白色
 */
const Avatar = ({
    size = 50,
    source,
    placeholder = '',
    icon,
    backgroundColor = '#ccc',
    textColor = '#fff',
    iconColor = '#fff',
    style,
}) => {
    const renderContent = () => {
        if (source) {
            return <Image source={source} style={[styles.image, { width: size, height: size }]} />;
        }
        if (icon) {
            return <Icon name={icon} size={size / 2} color={iconColor} />;
        }
        return (
            <TextInner style={[styles.placeholder, { fontSize: size / 3, color: textColor }]}>
                {placeholder}
            </TextInner>
        );
    };

    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor,
                },
                style,
            ]}
        >
            {renderContent()}
        </View>
    );
};

Avatar.propTypes = {
    size: PropTypes.number,
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    iconColor: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        resizeMode: 'cover',
        borderRadius: 999, // 确保图片圆形
    },
    placeholder: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Avatar;
