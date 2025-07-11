import { LOGI } from './Logger';

// 事件模块接口
export interface EventModule {
    dispatch(eventName: string, data?: any): void; // 触发事件
}

// Web 端事件派发模块
export class WebEventModule implements EventModule {
    dispatch(eventName: string, data: any = {}): void {}
}

// React Native 端事件派发模块
export class RNEventModule implements EventModule {
    private DeviceEventEmitter: any;

    constructor() {
        this.DeviceEventEmitter = require('react-native').DeviceEventEmitter;
    }

    dispatch(eventName: string, data: any = {}): void {
        this.DeviceEventEmitter.emit(eventName, data);
        console.log(`Dispatched Mobile event: ${eventName}, Data: ${JSON.stringify(data)}`);
    }
}

// 全局事件模块变量
let eventModule: EventModule;

// 设置事件模块
export function setEventModule(module: EventModule): void {
    eventModule = module;
}

// 获取当前事件模块
export function getEventModule(): EventModule {
    if (!eventModule) {
        throw new Error('Event module is not set. Please configure it during app initialization.');
    }
    return eventModule;
}

// 根据平台选择适合的事件模块
export function initEventModule(platform: 'Web' | 'Mobile' | 'other'): void {
    if (platform === 'Web') {
        setEventModule(new WebEventModule());
    } else if (platform === 'Mobile') {
        setEventModule(new RNEventModule());
    } else {
        throw new Error('Unsupported platform type.');
    }
}
