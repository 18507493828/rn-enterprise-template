import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInner, Icon } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';

// 默认类型配置
const typeConfig = {
    success: {
        icon: 'check-circle',
        backgroundColor: '#4CAF50',
        iconColor: '#FFF',
    },
    warning: {
        icon: 'warning',
        backgroundColor: 'rgba(255,157,0,0.09)',
        iconColor: '#FFF',
    },
    error: {
        icon: 'tips',
        backgroundColor: 'rgba(240,85,172,0.09)',
        iconColor: '#F055AC',
    },
};

// MessageContainer 显示内容
const MessageContainer = ({
    type = 'success',
    title,
    content,
    showClose = false,
    style,
    onClose,
}) => {
    const { icon, backgroundColor, iconColor } = typeConfig[type] || {};
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor,
                },
                style,
            ]}
        >
            <View style={styles.messageContent}>
                {icon && <Icon name={icon} size={24} color={iconColor} style={styles.icon} />}
                <View style={styles.textContainer}>
                    {title && <TextInner style={styles.title}>{title}</TextInner>}
                    {content && (
                        <TextInner
                            style={[
                                styles.content,
                                {
                                    color:
                                        type == 'error'
                                            ? '#F055AC'
                                            : type == 'warning'
                                              ? '#FF9D00'
                                              : '#FFF',
                                },
                            ]}
                        >
                            {content}
                        </TextInner>
                    )}
                </View>
                {showClose && (
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={24} color="#FFF" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        borderRadius: 8,
    },
    messageContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: scaleSize(10),
        paddingTop: scaleSize(2),
        paddingBottom: scaleSize(2),
    },
    icon: {
        marginRight: 8,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    content: {
        fontSize: 14,
        color: '#FFF',
    },
    closeButton: {
        marginLeft: 8,
    },
});

export default MessageContainer;
