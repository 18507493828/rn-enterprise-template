import API from '../../../jssdk/config/API';
import BaseService from './BaseService';
import { RequestMethod } from '../../../jssdk/lib/Types';
import { TranscationEntity, WithdrawalEntity } from '../entity/TransactionEntity';

class TransactionService extends BaseService {
    /**
     * 获取交易统计
     * @returns
     */
    public static async getTransactionStataic(): Promise<any> {
        return await this.request(RequestMethod.GET, API.TRANSACTION_STATISTICS, {
            params: {},
        });
    }

    /**
     * 获取提现记录
     * @returns
     */
    public static async getWithdrawalList(options: WithdrawalEntity): Promise<any> {
        return await this.request(RequestMethod.GET, API.WITHDRAWAL_LIST, {
            params: { ...options },
        });
    }

    /**
     * 获取提现详情
     * @returns
     */
    public static async getWithdrawalDetail(id: string): Promise<any> {
        return await this.request(RequestMethod.GET, API.WITHDRAWAL_DETAIL, {
            params: { id },
        });
    }

    /**
     * 获取订单记录
     * @returns
     */
    public static async getOrderList(options: TranscationEntity): Promise<any> {
        return await this.request(RequestMethod.GET, API.ORDERINCOME_LIST, {
            params: { ...options },
        });
    }

    /**
     * 获取订单详情
     * @returns
     */
    public static async getOrderInfo(order_id: string): Promise<any> {
        return await this.request(RequestMethod.GET, API.ORDERINCOME_INFO, {
            params: { order_id },
        });
    }
}

export default TransactionService;
