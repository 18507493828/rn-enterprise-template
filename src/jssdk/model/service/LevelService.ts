import API from '@jssdk/config/API';
import BaseService from './BaseService';
import { RequestMethod } from '@jssdk/lib/Types';

class LevelService extends BaseService {
    /**
     * 领取等级奖励
     * @returns
     */
    public static async receiveReward(options: { level: number }): Promise<any> {
        return await this.request(RequestMethod.POST, API.LEVEL_RECEIVE_REWARD, {
            data: { ...options },
        });
    }

    /**
     * 获取用户等级未领取的晋级奖励
     * @returns
     */
    public static async getUnreceivedRewards(): Promise<any> {
        return await this.request(RequestMethod.GET, API.LEVEL_GET_UNRECEIVED_REWARDS);
    }

    /**
     * 获取用户所有的晋级奖励
     * @returns
     */
    public static async getAllRewards(): Promise<any> {
        return await this.request(RequestMethod.GET, API.LEVEL_GET_ALL_REWARDS);
    }

    /**
     * 获取用户等级规则
     * @returns
     */
    public static async getLevelRules(): Promise<any> {
        return await this.request(RequestMethod.GET, API.LEVEL_GET_LEVEL_RULES);
    }
}

export default LevelService;
