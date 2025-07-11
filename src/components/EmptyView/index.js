import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon, TextInner } from '@components/index';

const EmptyView = ({
    iconName, // 图标名称
    iconSize = 50, // 图标大小
    iconColor = '#999', // 图标颜色
    imageSource, // 图片资源
    imageStyle = {}, // 图片样式
    title, // 文字标题
    titleStyle = {}, // 标题样式
    description, // 描述文字
    descriptionStyle = {}, // 描述样式
    containerStyle = {}, // 容器样式
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {iconName && (
                <Icon name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
            )}
            {imageSource && (
                <Image
                    source={imageSource}
                    style={[styles.image, imageStyle]}
                    resizeMode="contain"
                />
            )}
            {title && <TextInner style={[styles.title, titleStyle]}>{title}</TextInner>}
            {description && (
                <TextInner style={[styles.description, descriptionStyle]}>{description}</TextInner>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    icon: {
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default EmptyView;
