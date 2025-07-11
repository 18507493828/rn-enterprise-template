import { getStorage, removeStorage, setAnyStorage, setStorage } from '@utils/StorageUtil';

const TAG = 'country_list';

export default class CountryStorage {
    static async save(data) {
        try {
            const jsonValue = JSON.stringify(data);
            await setAnyStorage(TAG, jsonValue);
        } catch (e) {
            // 处理存储错误
            console.error(e);
        }
    }

    static async getInfo() {
        try {
            const jsonValue = await getStorage(TAG);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // 处理获取错误
            console.error(e);
            return null;
        }
    }

    /**
     * 删除存储中某项
     * @param {*} key
     * @returns
     */
    static async remove() {
        removeStorage(TAG);
    }

    /**
     * 清空所有服务地址
     * @param {*} inputLine
     */
    static async clear() {
        await removeStorage(TAG);
    }
}
