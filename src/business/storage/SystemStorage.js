import { LOGE } from '@jssdk/lib/Logger';
import { setStorage, getStorage, removeStorage } from '@utils/StorageUtil';

const TAG = 'system_info';

export default class SystemStorage {
    static async save(info = {}) {
        const {} = info;
        try {
            // const data = await this.getInfo();
            await setStorage('system_info', info);
        } catch (error) {
            LOGE(TAG, error);
        }
    }

    static async getInfo() {
        let info = {};
        try {
            const infoStr = await getStorage('system_info');
            if (infoStr) {
                const systemInfo = JSON.parse(infoStr);
                info = systemInfo;
            }
        } catch (error) {
            LOGE(TAG, error);
        }
        return info;
    }

    /**
     * 删除存储中某项
     * @param {*} key
     * @returns
     */
    static async remove(key) {
        const info = await this.getInfo();
        if (typeof info[key] !== 'undefined') {
            delete info[key];
            await setStorage('system_info', info);
        }
        return info;
    }

    /**
     * 清空所有服务地址
     * @param {*} inputLine
     */
    static async clear() {
        await removeStorage('system_info');
    }
}
