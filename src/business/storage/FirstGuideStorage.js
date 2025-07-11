import { getStorage, removeStorage, setAnyStorage } from '@utils/StorageUtil';

const TAG = 'FirstGuideStorage';
const TAGBOTTOM = 'FirstGuideStorageBottom';

export default class FirstGuideStorage {
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

    //获取底部记录的标记
    static async getBottomGuide() {
        try {
            const jsonValue = await getStorage(TAGBOTTOM);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // 处理获取错误
            console.error(e);
            return null;
        }
    }

    //保存底部记录的标记
    static async saveBottomGuide(data) {
        try {
            const jsonValue = JSON.stringify(data);
            await setAnyStorage(TAGBOTTOM, jsonValue);
        } catch (e) {
            // 处理存储错误
            console.error(e);
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
