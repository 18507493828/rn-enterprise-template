import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from '@navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToastManager from '@components/Toast';
import EventManager from '@view/common/EventManager';
import OneSignalInit from '@view/common/OneSignalManager/OneSignalInit';
import { initLauchData } from '@view/common/LauchManager';
import RNBootSplash from 'react-native-bootsplash';
import { checkAppUpdate } from '@view/common/UpdateManager';
import { activityManager } from '@view/common/ActivityManager';

const AppContainer = () => {
    let interval: any;

    useEffect(() => {
        //推送初始化
        OneSignalInit();

        //初始化数据
        initLauchData();

        // 初始化事件监听
        EventManager.registerEmitter();

        // 在组件卸载时清理所有事件监听
        return () => {
            clearTimeout(interval);
            EventManager.clearAllEvents();
        };
    }, []);

    const init = () => {
        interval = setTimeout(() => {
            RNBootSplash.hide({ fade: true });

            //检测是否需要强制更新
            checkAppUpdate();

            // 检查是否需要显示升降级弹窗
            activityManager();
        }, 1500);
    };
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <AppNavigation onReady={init} />
                <ToastManager />
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
};

export default AppContainer;
