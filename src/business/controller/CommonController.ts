import ResultCode from '@jssdk/config/ResultCode';
import CountryStorage from '@business/storage/CountryStorage';
import { CommonService, FileService } from '@jssdk/model/service';
import UserStorage from '@business/storage/UserStorage';
import { BindIdEntity, SendMsgEntity } from '@jssdk/model/entity/CommonEntity';
import UserStore from '@lib/zustand/UserStore';
import CommonStore from '@lib/zustand/CommonStore';
import { ErrorDescription } from '@business/config/ErrorDescription';
import { timeWithFomatterHHmmss } from '@utils/dayjs';
import BaseController from './BaseController';
import { ApiError } from '@jssdk/core/errors';
import { LOGD, LOGI } from '@jssdk/lib/Logger';

class CommonControllers extends BaseController {
    protected static TAG = 'CommonControllers';

    /**
     * 获得国家列表
     * @returns
     */
    public static async getCountryList() {
        let data = [];
        try {
            const result = await CommonService.getCountryList();
            //国家本地信息
            const countryList = (await CountryStorage.getInfo()) ?? [];
            data = result.data;
            if (data?.length > 0) {
                const dictCountry = data.filter((v: { name: string }) => v.name == 'NG')[0];
                CommonStore.getState().setDefaultCountryData(dictCountry);
            }
            CommonStore.getState().setCountryList(data);

            //本地国家为空，或者本地国家数量和当前返回的不一致再去保存本地
            if (countryList.length !== data.length || countryList.length === 0) {
                CountryStorage.save(data);
            }
        } catch (error) {
            this.handleError({ error, data, showPrompt: false });
        }
        return data;
    }

    /**
     * 发送验证码
     * @param options
     * @returns
     */
    public static async sendCode(options: SendMsgEntity) {
        let status = false;
        try {
            await CommonService.sendCode(options);
            status = true;
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.code === ResultCode.LOGIN_LIMIT_REGISTER) {
                    const blockedUntil = (error.data as any)?.blocked_until;
                    error.message = `${ErrorDescription[error.code]} ${timeWithFomatterHHmmss(blockedUntil)}`;
                }
            }
            this.handleError({ error });
        }
        return status;
    }

    /**
     * 获取用户信息
     * @returns
     */
    public static async getUserInfo() {
        let data = {};
        try {
            const result = await CommonService.getUserInfo();
            data = result.data;
            let userInfo = result.data;
            userInfo.showUserName = `${userInfo.first_name} ${userInfo.last_name}`;
            UserStore.getState().setUserInfo(userInfo);
            UserStore.getState().setCurrency(userInfo?.currency);
            UserStorage.save(userInfo);
        } catch (error) {
            this.handleError({
                error,
                data,
            });
        }
        return data;
    }

    /**
     * 上传文件
     * @param files
     * @param type
     * @returns
     */
    public static async uploadFiles(files: [], type?: string) {
        let data = [];
        try {
            // 获得签名 URL 及 请求token
            const result = await FileService.getSignatureUrls(files, type);
            const uploadPromises = result.data.map(async (item: SignatureEntity, index: number) => {
                const { url, token } = item;
                await FileService.uploadFileToBucket(url, token, files[index]);
                return item;
            });

            data = await Promise.all(uploadPromises);

            LOGI(this.TAG, `[${this.methodName}]`, `uploaded file size: ${data.length}`);
            LOGD(this.TAG, `[${this.methodName}]`, `uploaded fileInfos: ${JSON.stringify(data)}`);
        } catch (error) {
            this.handleError({ error, data });
        }

        return data;
    }

    /**
     * 推送绑定设备
     * @param id
     * @returns
     */
    public static async bindPush(options: BindIdEntity) {
        let data = {};
        try {
            const result = await CommonService.bindPush(options);
            data = result;
        } catch (error) {
            this.handleError({ error, data });
        }
        return data;
    }

    /**
     * 预加载获取后台配置
     * @returns
     */
    public static async globalConfigs() {
        let data = {};
        try {
            const result = await CommonService.globalConfigs();
            const version = result?.data.app_version;
            data = { minimumSupportedVersion: version?.min_version, version: version?.version };
        } catch (error) {
            this.handleError({ error, data, showPrompt: false });
        }
        return data;
    }

    /**
     * 获取用户升级/降级通知状态
     * @returns {Promise<any>} 处理后的是否升级或者降级
     */
    public static async getLevelNotification() {
        let data: any = {};
        try {
            const result = await CommonService.getLevelNotification();
            data = result.data;
            if (!data.notification) {
                return;
            }
            data = {
                isLevelUp: data.level > data.old_level,
                isLevelDown: data.level < data.old_level,
                level: data.level,
            };
        } catch (error) {
            this.handleError({ error, data, showPrompt: false });
        }
        return data;
    }
}

export default CommonControllers.createStaticProxy();
