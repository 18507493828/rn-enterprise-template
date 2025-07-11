import API from '../../../jssdk/config/API';
import BaseService from './BaseService';
import { RequestMethod } from '../../../jssdk/lib/Types';
import { RankListEntity, RankReawardEntity } from '../entity/RankEntity';

class RankService extends BaseService {
    /**
     * 销售排行榜
     * @returns
     */
    public static async getSaleList(options: RankListEntity): Promise<any> {
        return await this.request(RequestMethod.GET, API.RANK_SALELIST, {
            params: { ...options },
        });
    }

    /**
     * 排行榜规则
     * @returns
     */
    public static async getRankRules(): Promise<any> {
        return await this.request(RequestMethod.GET, API.RANK_SALESRULES);
    }

    /**
     * 排行榜奖励
     * @returns
     */
    public static async getRewardList(options: RankReawardEntity): Promise<any> {
        return await this.request(RequestMethod.GET, API.RANK_REWARDLIST, {
            params: { ...options },
        });
    }

    /**
     * 邀请排行榜
     * @returns
     */
    public static async getInvatationList(options: { year: string; month: string }): Promise<any> {
        return await this.request(RequestMethod.GET, API.RANK_INVITATIONLIST, {
            params: { ...options },
        });
    }

    /**
     * 邀请排行榜规则
     * @returns
     */
    public static async getInvatationRules(): Promise<any> {
        return await this.request(RequestMethod.GET, API.RANK_INVITATIONRULES);
    }

    /**
     * 领取排行奖励
     * @returns
     */
    public static async claimRankReward(options: { id: number; type: string }): Promise<any> {
        return await this.request(RequestMethod.POST, API.RANK_CLAIMRANKREWARD, {
            data: {
                ...options,
            },
        });
    }
}
export default RankService;
