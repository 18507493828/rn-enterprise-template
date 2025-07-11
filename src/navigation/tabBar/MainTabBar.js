import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@components/index';
import useTabBarManager from './TabBarManager';
import { scaleSize } from '@utils/ScreenUtil';
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

// 创建 Tab 导航器
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, isSpecial, enableAnimation, ...props }) => {
    const scale = useSharedValue(1); // 用于存储动画值

    // 动画效果：点击时图标放大
    const handlePressIn = () => {
        enableAnimation && (scale.value = withSpring(1.2, { damping: 2, stiffness: 100 })); // 放大
    };

    const handlePressOut = () => {
        enableAnimation && (scale.value = withSpring(1, { damping: 2, stiffness: 100 })); // 恢复原始大小
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }], // 绑定缩放动画
        };
    });

    return (
        <Pressable
            {...props}
            onPress={onPress}
            android_ripple={null} // 去掉 Android Ripple 效果
            onPressIn={handlePressIn} // 按下时触发放大
            onPressOut={handlePressOut} // 放开时恢复
            style={({ pressed }) => [
                isSpecial ? styles.specialButton : null, // 为特殊按钮应用额外样式
                pressed ? styles.noPressEffect : null,
            ]}
        >
            <Animated.View style={[styles.customTabBarButton, enableAnimation && animatedStyle]}>
                {children}
            </Animated.View>
        </Pressable>
    );
};

const MainTabBar = React.memo(() => {
    const { handleTabPress, tabBarData, screenOptions } = useTabBarManager();
    const { t } = useTranslation();
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            {tabBarData.map(tab =>
                !tab.hidden ? (
                    <Tab.Screen
                        key={tab.name}
                        name={tab.name}
                        component={tab.component}
                        options={{
                            tabBarIcon: ({ color, size }) =>
                                tab.special ? (
                                    <View style={[styles.specialIconContainer]}>
                                        <Icon name={tab.icon} color={'#000'} size={scaleSize(45)} />
                                    </View>
                                ) : (
                                    <Icon
                                        name={tab.icon}
                                        color={color || '#000'}
                                        size={size || 24}
                                    />
                                ),
                            tabBarLabel: t(tab.i18nName),
                            tabBarButton: props => (
                                <CustomTabBarButton
                                    {...props}
                                    isSpecial={tab.special}
                                    enableAnimation={true}
                                    onPress={e => {
                                        e.preventDefault(); // 阻止默认的导航行为
                                        const canNavigate = handleTabPress(tab.name); // 判断是否可以导航
                                        if (canNavigate && props.onPress) {
                                            props.onPress(e); // 如果允许导航，调用默认的 onPress 事件
                                        }
                                    }}
                                />
                            ),
                        }}
                    />
                ) : null,
            )}
        </Tab.Navigator>
    );
});

const styles = StyleSheet.create({
    customTabBarButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPressEffect: {
        opacity: 1, // 保持按下时的透明度不变
    },
    specialIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleSize(45),
        width: scaleSize(45),
        marginBottom: scaleSize(20),
    },
});

export default MainTabBar;
