import API from '@jssdk/config/API';
import BaseService from './BaseService';
import { RequestMethod } from '@jssdk/lib/Types';
import { FriendEntity, ReportBlackEntity } from '../entity/BlackWhiteEntity';

class BlackWhiteService extends BaseService {
    /**
    黑名单列表
     */
    public static async getBlackList(options: { page_size: number }): Promise<any> {
        return await this.request(RequestMethod.GET, API.BLACK_LIST, {
            params: { ...options },
        });
    }

    /**
    白名单列表
     */
    public static async getWhiteList(options: { page_size: number }): Promise<any> {
        return await this.request(RequestMethod.GET, API.WHITE_LIST, {
            params: {
                ...options,
            },
        });
    }

    /**
    朋友列表
     */
    public static async getFriendList(): Promise<any> {
        return await this.request(RequestMethod.GET, API.FRIEND_LIST, {
            params: {},
        });
    }

    /**
    朋友详情
     */
    public static async getFriendInfo(options: FriendEntity): Promise<any> {
        return await this.request(RequestMethod.GET, API.FRIEND_INFO, {
            params: { ...options },
        });
    }

    /**
     * 黑名单上报
     */
    public static async reportBlack(options: ReportBlackEntity): Promise<any> {
        return await this.request(RequestMethod.POST, API.REPORT_BLACK, {
            data: {
                ...options,
            },
        });
    }
}

export default BlackWhiteService;
