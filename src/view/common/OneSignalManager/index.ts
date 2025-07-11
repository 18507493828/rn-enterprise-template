import { LogLevel, OneSignal } from 'react-native-onesignal';
import PushManager from '../PushManager';
let clickHandled = false;
// 推送相关初始化函数
const initializePushNotifications = (appId: string) => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose); // 设置日志级别
    OneSignal.initialize(appId); // 初始化 OneSignal
    OneSignal.Notifications.requestPermission(true); // 请求权限
};

const eventDispatch = (eventName: string, event: any) => {
    if (clickHandled) return;
    let timeout = eventName === 'click' ? 2000 : 1000;
    const additionalData = event.notification?.additionalData;
    // 调用 PushManager 的方法来处理点击事件
    if (eventName === 'click') {
        PushManager.puchClick(additionalData);
    } else if (eventName === 'foregroundWillDisplay') {
        PushManager.puchTransaction(additionalData);
    }
    clickHandled = true;
    //防止重复点击，因为消息发过来不分区类型。
    setTimeout(() => {
        clickHandled = false;
    }, timeout);
};

// 点击事件监听器函数
const setupPushNotificationClickListener = () => {
    const handleClick = (event: any) => {
        eventDispatch('click', event);
    };

    // 添加点击事件监听器
    OneSignal.Notifications.addEventListener('click', handleClick);
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
        event.preventDefault();
        eventDispatch('foregroundWillDisplay', event);
        event.getNotification().display();
    });
    // 返回清理函数，用于移除事件监听器
    return () => {
        OneSignal.Notifications.removeEventListener('click', handleClick);
    };
};

// 主推送初始化函数，返回移除监听器的函数
const setupPushNotifications = (appId: any) => {
    // 初始化推送服务
    initializePushNotifications(appId);
    const removeClickListener = setupPushNotificationClickListener();
    return removeClickListener;
};

export default setupPushNotifications;
