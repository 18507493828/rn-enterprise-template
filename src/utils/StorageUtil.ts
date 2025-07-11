import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGE } from '@jssdk/lib/Logger';

const TAG = 'AsyncStorage';

function isJSONString(str: string): boolean {
    try {
        const obj = JSON.parse(str);
        return typeof obj === 'object' && obj !== null;
    } catch (e) {
        LOGE(`error：${str}!!!${e}`);
        return false;
    }
}

/**
 * 存储任意类型数据（自动转 JSON 字符串）
 */
export async function setStorage(key: string, value: any): Promise<void> {
    try {
        const valueStr = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, valueStr);
    } catch (error) {
        LOGE(TAG, error);
    }
}

/**
 * 存储原始字符串数据（不转换）
 */
export async function setAnyStorage(key: string, value: string): Promise<void> {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        LOGE(TAG, error);
    }
}

/**
 * 获取数据，支持 Promise 和回调方式
 */
export async function getStorage(key: string): Promise<string | null>;
export async function getStorage(
    key: string,
    callback: (value: string | null) => void,
): Promise<null>;
export async function getStorage(
    key: string,
    callback?: (value: string | null) => void,
): Promise<string | null> {
    if (typeof callback !== 'function') {
        return await AsyncStorage.getItem(key);
    }

    AsyncStorage.getItem(key).then(callback);
    return null;
}

/**
 * 移除数据（单个或多个 key）
 */
export async function removeStorage(key: string | string[]): Promise<void> {
    if (typeof key === 'string') {
        await AsyncStorage.removeItem(key);
    } else {
        await Promise.all(key.map(item => AsyncStorage.removeItem(item)));
    }
}

/**
 * 清空所有数据
 * @param callback
 */
export async function clearAllStorage(callback?: () => void): Promise<void> {
    await AsyncStorage.clear();
    callback?.();
}
