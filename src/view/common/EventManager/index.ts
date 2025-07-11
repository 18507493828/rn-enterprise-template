import { DeviceEventEmitter, AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { EventMappging, NO_REGISTER_EMITTER_LIST } from './EventConfig';

export default class EventManager {
    private static eventKeyList: Set<string> = new Set();
    private static appStateSubscription: any = null; // 用于存储 AppState 的订阅对象
    private static networkStateSubscription: any = null; // 用于存储网络状态的订阅对象

    /**
     * 注册所有事件，包括AppState变化和网络状态变化的监听
     */
    public static registerEmitter = () => {
        // 注册全局事件
        Object.keys(EventMappging).forEach(key => {
            // 通过显式类型转换，将 key 从 string 类型转换为 keyof typeof EventMappging，
            // 不然 TypeScript 提示: 'key' 是 string 类型会报错
            const eventKey = key as keyof typeof EventMappging; // 这里确保 key 是 keyof EventMapping
            // 在白名单内的 或者 已经添加监听注册的 不再进行监听
            if (NO_REGISTER_EMITTER_LIST.includes(eventKey) || this.eventKeyList.has(eventKey)) {
                return;
            }
            // 记录已注册的事件
            this.eventKeyList.add(eventKey);

            // 注册事件监听
            const eventHandler = EventMappging[eventKey];

            if (typeof eventHandler === 'function') {
                DeviceEventEmitter.addListener(eventKey, eventHandler);
            }
        });

        // 注册 AppState 和网络状态监听
        this.registerAppStateChangeListener();
        this.registerNetworkChangeListener();
    };

    /**
     * 销毁所有事件
     */
    public static destructionEmitter = () => {
        Object.keys(EventMappging).forEach(key => {
            const eventKey = key as keyof typeof EventMappging;

            // 在白名单内的 不进行处理
            if (NO_REGISTER_EMITTER_LIST.includes(eventKey)) {
                return;
            }

            // 销毁事件监听
            DeviceEventEmitter.removeAllListeners(eventKey);
        });

        // 清除 AppState 和网络状态监听
        this.removeAppStateChangeListener();
        this.removeNetworkChangeListener();

        // 清空已注册事件列表
        this.eventKeyList.clear();
    };

    /**
     * 注册AppState变化的事件监听
     */
    private static registerAppStateChangeListener = () => {
        if (!this.appStateSubscription) {
            this.appStateSubscription = AppState.addEventListener(
                'change',
                EventMappging.appStateChangeEvent,
            );
        }
    };

    /**
     * 移除AppState变化的事件监听
     */
    private static removeAppStateChangeListener = () => {
        if (this.appStateSubscription) {
            this.appStateSubscription.remove();
            this.appStateSubscription = null;
        }
    };

    /**
     * 注册网络状态变化的事件监听
     */
    private static registerNetworkChangeListener = () => {
        if (!this.networkStateSubscription) {
            this.networkStateSubscription = NetInfo.addEventListener(
                EventMappging.networkChangeEvent,
            );
        }
    };

    /**
     * 移除网络状态变化的事件监听
     */
    private static removeNetworkChangeListener = () => {
        if (this.networkStateSubscription) {
            this.networkStateSubscription();
            this.networkStateSubscription = null;
        }
    };

    /**
     * 注册单个事件
     * @param eventKey 事件名称
     * @param listener 事件处理函数
     */
    public static registerSingleEvent = (
        eventKey: keyof typeof EventMappging,
        listener: (...args: any[]) => void,
    ) => {
        if (!this.eventKeyList.has(eventKey)) {
            this.eventKeyList.add(eventKey);
            DeviceEventEmitter.addListener(eventKey, listener);
        }
    };

    /**
     * 销毁单个事件
     * @param eventKey 事件名称
     */
    public static unregisterSingleEvent = (eventKey: keyof typeof EventMappging) => {
        if (this.eventKeyList.has(eventKey)) {
            DeviceEventEmitter.removeAllListeners(eventKey);
            this.eventKeyList.delete(eventKey);
        }
    };

    /**
     * 清理所有事件
     */
    public static clearAllEvents = () => {
        this.destructionEmitter();
    };
}
