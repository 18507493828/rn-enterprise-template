export interface StorageModule {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}

export class WebStorage implements StorageModule {
    async getItem(key: string): Promise<string | null> {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error('获取 localStorage 时出错:', error);
            return null;
        }
    }

    async setItem(key: string, value: string): Promise<void> {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error('设置 localStorage 时出错:', error);
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('删除 localStorage 时出错:', error);
        }
    }
}

export class RNStorage implements StorageModule {
    private AsyncStorage = require('@react-native-async-storage/async-storage').default;

    async getItem(key: string): Promise<string | null> {
        try {
            return await this.AsyncStorage.getItem(key);
        } catch (error) {
            console.error('获取 AsyncStorage 时出错:', error);
            return null;
        }
    }

    async setItem(key: string, value: string): Promise<void> {
        try {
            await this.AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('设置 AsyncStorage 时出错:', error);
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            await this.AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('删除 AsyncStorage 时出错:', error);
        }
    }
}

let storage: StorageModule;

export function setStorageModule(module: StorageModule): void {
    storage = module;
}

export function getStorageModule(): StorageModule {
    if (!storage) {
        throw new Error(
            'Storage module is not set. Please configure it during app initialization.',
        );
    }
    return storage;
}

// 根据平台选择适合的事件模块
export function initStorageModule(platformType: 'Web' | 'Mobile' | 'other'): void {
    if (platformType === 'Mobile') {
        setStorageModule(new RNStorage()); // 使用 React Native 存储模块
    } else if (platformType === 'Web') {
        setStorageModule(new WebStorage()); // 使用 Web 存储模块
    } else {
        throw new Error('Unsupported platform type.');
    }
}
