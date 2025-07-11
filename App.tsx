import '@localization/i18n';
import React, { useEffect } from 'react';
import SDK from '@jssdk/index';
import Config from 'react-native-config';
import { ThemeProvider } from '@contexts/ThemeContext';
import { RootSiblingParent } from 'react-native-root-siblings';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SheetProvider } from 'react-native-actions-sheet';
import AppContainer from './src/AppContainer';
import setupPushNotifications from '@view/common/OneSignalManager';
import { IntercomHideListener } from '@view/common/ChatManager';
import * as Sentry from '@sentry/react-native';
import { extendedConfig, isDebugMode } from '@config/EnvConfig';
import LanguageStore from '@lib/zustand/LanguageStore';

if (isDebugMode) {
    //打印日志工具
    require('./ReactotronConfig');
}

// 初始化 SDK
SDK.initialize({
    extendedConfig,
    platformType: 'Mobile',
    isDebugMode: isDebugMode,
    loggerConfig: {
        writeToFile: false,
    },
});

//监控日志
Sentry.init({
    dsn: Config.SENTRY_DSN,
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    sendDefaultPii: true,
});

function App() {
    const { initLang } = LanguageStore();

    useEffect(() => {
        // 启动时读取并设置语言
        initLang();

        //ios聊天UI阻塞相关处理
        const IntercomHidelistener = IntercomHideListener();

        // 推送通知
        const removeOneSignalListener = setupPushNotifications(Config.ONESIGNAL_APP_ID);
        return () => {
            //程序停止后移除推送监听。
            removeOneSignalListener();
            IntercomHidelistener.remove();
        };
    }, []);

    return (
        <KeyboardProvider>
            <ThemeProvider>
                <RootSiblingParent>
                    <SheetProvider>
                        <AppContainer />
                    </SheetProvider>
                </RootSiblingParent>
            </ThemeProvider>
        </KeyboardProvider>
    );
}
export default Sentry.wrap(App);
