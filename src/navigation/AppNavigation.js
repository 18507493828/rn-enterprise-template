import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDefaultStackOptions } from './StackOptions';
import Routes, { APP_LAUNCH, INIT_ROUTE_NAME } from './router';
import { navigationRef } from './RootNavigation'; // 引入你的 navigationRef
import { FirstLanchAppStorage } from '@business/storage';
import {
    initKeyboardListeners,
    navigationManager,
    removeKeyboardListeners,
} from '@view/common/NavigationManager';
import { useTranslation } from 'react-i18next';
const Stack = createNativeStackNavigator();

/**
 * 加载页面栈列表
 * @returns
 */
const loadStackScreenList = () => {
    const stackScreenArray = [];
    Object.keys(Routes).forEach((key, index) => {
        const { screen, options } = Routes[key];
        stackScreenArray.push(
            <Stack.Screen key={index} name={`${key}`} component={screen} options={options} />,
        );
    });
    return stackScreenArray;
};

/**
 * 应用导航载入
 * @returns
 */
const AppNavigation = props => {
    const { t } = useTranslation();
    const [initialRouteName, setInitialRouteName] = useState(null);
    useEffect(() => {
        getStorageRouteName();

        // 初始化键盘监听
        initKeyboardListeners();

        // 组件卸载时移除键盘监听
        return () => {
            removeKeyboardListeners();
        };
    }, []);

    const getStorageRouteName = async () => {
        const routeName = await FirstLanchAppStorage.getInfo();
        if (routeName === null) {
            setInitialRouteName(APP_LAUNCH);
        } else {
            setInitialRouteName(INIT_ROUTE_NAME);
        }
    };

    //不渲染 UI，直到数据加载完成
    if (!initialRouteName) {
        return null;
    }

    return (
        <NavigationContainer ref={navigationRef} {...props} onStateChange={navigationManager}>
            <Stack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={options => {
                    return getDefaultStackOptions(options, t);
                }}
            >
                {loadStackScreenList()}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
