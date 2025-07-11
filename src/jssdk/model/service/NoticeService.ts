import { RequestMethod } from '@jssdk/lib/Types';
import BaseService from './BaseService';
import API from '@jssdk/config/API';
import { MessageListEntity } from '../entity/NoticeEntity';

class NoticeService extends BaseService {
    /**
        消息通知列表
         */
    public static async getMessageList(options: MessageListEntity): Promise<any> {
        return await this.request(RequestMethod.GET, API.NOTIFICATION_LIST, {
            params: {
                ...options,
            },
        });
    }

    /**
       统计未读通知数量
         */
    public static async getMessageNumber(): Promise<any> {
        return await this.request(RequestMethod.GET, API.NOTIFICATION_STATISTICS);
    }

    /**
       获取消息详情
         */
    public static async getMessageDetail(id: number): Promise<any> {
        return await this.request(RequestMethod.GET, API.NOTIFICATION_INFO, {
            params: {
                id,
            },
        });
    }

    /**
     * 通知消息已读
     * @returns
     */
    public static async readMessage(id: number): Promise<any> {
        return await this.request(RequestMethod.POST, API.NOTIFICATION_READ, {
            data: {
                id,
            },
        });
    }

    /**
     * 删除通知
     * @returns
     */
    public static async deleteMessage(id: number): Promise<any> {
        return await this.request(RequestMethod.GET, API.NOTIFICATION_DELETE, {
            params: {
                id,
            },
        });
    }

    /**
     * 所有通知消息已读
     * @returns
     */
    public static async readAllMessage(): Promise<any> {
        return await this.request(RequestMethod.GET, API.NOTIFICATION_READALL);
    }
}

export default NoticeService;
