import { DeviceEventEmitter, EmitterSubscription } from 'react-native';

class HomeEventEmitterManager {
    private subscriptions: EmitterSubscription[] = [];

    /**
     * 添加事件监听
     * @param eventName 事件名称
     * @param listener 事件回调函数
     * @returns 返回 EmitterSubscription 对象，供外部管理
     */
    addListener(eventName: string, listener: (...args: any[]) => void): EmitterSubscription {
        const subscription = DeviceEventEmitter.addListener(eventName, listener);
        this.subscriptions.push(subscription);
        return subscription; // 返回订阅对象
    }

    /**
     * 移除所有事件监听
     */
    removeAllListeners() {
        this.subscriptions.forEach(subscription => subscription.remove());
        this.subscriptions = [];
    }
}

export default new HomeEventEmitterManager();
