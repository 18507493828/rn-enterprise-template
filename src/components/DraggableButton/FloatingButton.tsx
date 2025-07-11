import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const FloatingButton = ({}, ref) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    // 暴露给外部的方法
    useImperativeHandle(ref, () => ({
        toggleMenu: () => {
            const toValue = isMenuVisible ? 0 : 1;
            Animated.spring(animation, {
                toValue,
                friction: 5,
                useNativeDriver: true,
            }).start();
            setMenuVisible(!isMenuVisible);
        },
    }));

    const menuTranslateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -120], // 菜单向上移动的距离
    });

    const menuOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1], // 菜单透明度变化
    });

    return (
        <View style={styles.container}>
            {/* 菜单 */}
            <Animated.View
                style={[
                    styles.menu,
                    {
                        opacity: menuOpacity,
                        transform: [{ translateY: menuTranslateY }],
                    },
                ]}
            >
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Item 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Item 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Item 3</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute',
        width: 200,
        top: 20,
        // right: 20,
        height: 200,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButton: {
        // bottom: 30,
        // right: 30,
        // width: 60,
        // height: 60,
        borderRadius: 30,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
    },
    menu: {
        position: 'absolute',
        bottom: 100,
        right: 30,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        elevation: 5,
    },
    menuItem: {
        padding: 10,
    },
    menuItemText: {
        fontSize: 16,
        color: '#000',
    },
});

export default forwardRef(FloatingButton);
