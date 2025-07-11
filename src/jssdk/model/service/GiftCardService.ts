import API from '../../config/API';
import BaseService from './BaseService';
import { RequestMethod } from '../../lib/Types';

const TAG = 'SDK-GiftCardService';
class GiftCardService extends BaseService {
    /**
     * 根据国家id获得礼品卡列表
     * @param {number} country_id 国家 ID
     * @returns
     */
    public static async getGiftCardList(country_id: number): Promise<any> {
        return await this.request(RequestMethod.GET, API.CARD_GET_ALL_GIFT_CARD_LIST, {
            params: { country_id: country_id },
        });
    }
    /**
     * 广告
     */
    public static async getAdvertisementList(): Promise<any> {
        return await this.request(RequestMethod.GET, API.ADVERTISEMENT_LIST, {
            params: {},
        });
    }
    /**
     * 获取收藏列表
     */
    public static async getFavoriteList(): Promise<any> {
        return await this.request(RequestMethod.GET, API.CARD_FAVORITE_LIST, {
            params: { order: 'ASC' },
        });
    }
    /**
     * 添加收藏
     */
    public static async addToFavorites(cardId: number): Promise<any> {
        return await this.request(RequestMethod.POST, API.CARD_ADD_FAVORITE, {
            data: { card_type_id: cardId },
        });
    }
    /**
     * 移除收藏
     */
    public static async removeFavorites(cardId: number): Promise<any> {
        return await this.request(RequestMethod.DELETE, API.CARD_REMOVE_FAVORITE, {
            params: { card_type_id: cardId },
        });
    }

    /**
     * 交易礼品卡（出卡）
     * @param {Object} options  提交的交易卡信息
     * @param {string} options.uuid 当前汇率结果标记
     * @param {number} options.card_id 卡片 ID
     * @param {string} options.symbol  货币符号
     * @param {number} options.country_id  国家 ID
     * @param {string} options.balance  卡余额
     * @param {number} options.card_type  卡片类型 ID
     * @param {number} options.is_fast  是否快速交易
     *
     * @param {number} [options.card_head_id]  卡片头部 ID (可选）
     * @param {Object} options.card_info  卡片信息（包含动态部分）
     * @param {string} options.card_info.code  卡号
     * @param {string} [options.card_info.cvv]  卡背面 CVV（可选）
     * @param {string} [options.card_info.expiration_date]  过期日期（可选）
     * @param {string} [options.card_info.pin]  卡 PIN（可选）
     * @param {Array} options.images  交易卡图片信息数组
     * @param {string} options.images[].url  图片 URL
     * @returns {Promise<any>}
     */
    public static async sellGiftCard(options: SellGiftCardEntity): Promise<any> {
        // 数据校验
        this.validateRequiredFields(
            `${TAG}-sellGiftCard`,
            ['card_id', 'card_type', 'country_id', 'balance'],
            options,
        );

        // 发送请求
        return await this.request(RequestMethod.POST, API.CARD_ASYNC_SELL_CARD, {
            data: { ...options },
        });
    }

    /**
     * 获得卡实际价格汇率等信息
     * @param options
     * @param {number} options.card_type_id  卡种 ID
     * @param {number} options.country_id  国家 ID
     * @param {number} options.balance  输入金额
     * @param {number} options.card_type  卡片类型
     * @param {number} options.is_fast  是否快速交易
     * @returns
     */
    public static async getPriceRate(options: GetPriceRateEntity): Promise<any> {
        // 数据校验
        this.validateRequiredFields(
            `${TAG}-getPriceRate`,
            ['card_type_id', 'card_type', 'country_id', 'balance', 'is_fast'],
            options,
        );

        return await this.request(RequestMethod.POST, API.CARD_GET_PRICE_RATE, {
            data: { ...options },
        });
    }
}

export default GiftCardService;
