import API from '@jssdk/config/API';
import BaseService from './BaseService';
import { RequestMethod } from '@jssdk/lib/Types';
import { BindIdEntity, SendMsgEntity } from '../entity/CommonEntity';

class CommonService extends BaseService {
    /**
     * 获取国家列表
     * @returns
     */
    public static async getCountryList(): Promise<any> {
        return await this.request(RequestMethod.GET, API.COUNTRY_LIST, {
            params: {},
        });
    }
    /**
     * 获取用户余额
     * @returns
     */
    public static async getUserBalance(): Promise<any> {
        return await this.request(RequestMethod.GET, API.USER_BALANCE, {
            params: {},
        });
    }

    /**
     * 获取用户信息
     * @param userId
     * @returns
     */
    public static async getUserInfo(): Promise<any> {
        return await this.request(RequestMethod.GET, API.USER_GET_USER_INFO, {
            params: {},
        });
    }

    /**
     * 发送验证码
     * phone 手机号码
     */
    public static async sendCode(options: SendMsgEntity): Promise<any> {
        return await this.request(RequestMethod.POST, API.USER_GET_SMS_CODE, {
            data: {
                ...options,
            },
        });
    }

    /**
     * 刷新token
     * @returns
     */
    public static async refreshToken(): Promise<any> {
        return await this.request(RequestMethod.POST, API.REFRESH_TOKEN, {
            data: {},
        });
    }
    /**
     * 绑定推送
     */
    public static async bindPush(options: BindIdEntity): Promise<any> {
        return await this.request(RequestMethod.POST, API.BIND_PUSH, {
            data: { player_id: options.id, device_type: options.platform },
        });
    }
    /**
     * 预加载获取后台配置
     */
    public static async globalConfigs(): Promise<any> {
        return await this.request(RequestMethod.GET, API.GLOBAL_CONFIGS, {});
    }

    /**
     * 获取等级通知
     */
    public static async getLevelNotification(): Promise<any> {
        return await this.request(RequestMethod.GET, API.LEVEL_NOTIFICATION, {});
    }
}

export default CommonService;
