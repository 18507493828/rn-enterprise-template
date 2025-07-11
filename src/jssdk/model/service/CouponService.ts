import API from '../../config/API';
import BaseService from './BaseService';
import { RequestMethod } from '../../lib/Types';

const TAG = 'CouponService';
class CouponService extends BaseService {
    /**
     * 获取优惠券列表
     */
    public static async getCouponList(): Promise<any> {
        return await this.request(RequestMethod.GET, API.CARD_COUPON_LIST, {
            params: {},
        });
    }
}

export default CouponService;
