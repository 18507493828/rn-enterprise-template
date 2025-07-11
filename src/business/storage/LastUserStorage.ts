import { getStorage, removeStorage, setStorage } from '@utils/StorageUtil';

import { LOGE } from '@jssdk/lib/Logger';
import { getStorageModule, setStorageModule } from '@jssdk/lib/Storage';

const KEY = 'last_user_info';

export default class UserStorage {
    static async save(data = {}) {
        try {
            await setStorage(KEY, data);
        } catch (error) {
            LOGE(KEY, error);
        }
    }

    static async getInfo(): Promise<any> {
        let info = {};
        try {
            const infoStr = await getStorageModule().getItem(KEY);
            if (infoStr) {
                const systemInfo = JSON.parse(infoStr);
                info = Object.assign(info, systemInfo);
            }
        } catch (error) {
            LOGE(KEY, error);
        }
        return info;
    }

    /**
     * 删除存储中某项
     * @param {*} key
     * @returns
     */
    static async remove(key: any) {
        const info = await this.getInfo();
        if (typeof info[key] !== 'undefined') {
            delete info[key];
            await setStorage(KEY, info);
        }
        return info;
    }

    /**
     * 清空所有服务地址
     * @param {*} inputLine
     */
    static async clear() {
        await removeStorage(KEY);
    }
}
