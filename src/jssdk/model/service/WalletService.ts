import API from '../../config/API';
import BaseService from './BaseService';
import { RequestMethod } from '../../lib/Types';
class WalletService extends BaseService {
    /**
     * 获得银行卡
     * @returns
     */
    public static async getBankList(): Promise<any> {
        return await this.request(RequestMethod.GET, API.WALLET_BANK_LIST, {
            params: {},
        });
    }
    /**
     * 获得系统银行卡
     * @returns
     */
    public static async getSystemBankList(countryId: string): Promise<any> {
        return await this.request(RequestMethod.GET, API.WALLET_SYSTEM_LIST, {
            params: { user_country_id: countryId },
        });
    }
    /**
     * 新增银行卡
     * @returns
     */
    public static async addBank(options: AddBankEntity): Promise<any> {
        return await this.request(RequestMethod.POST, API.WALLET_ADD_BANK, {
            data: {
                ...options,
            },
        });
    }
    /**
     * 删除用户银行卡
     * @returns
     */
    public static async deleteBank(id: string, password: string): Promise<any> {
        return await this.request(RequestMethod.POST, API.WALLET_DELETE_BANK, {
            data: { id: id, password: password },
        });
    }
    /**
     * 获取用户校验交易状态
     * @returns
     */
    public static async transactionStatus(): Promise<any> {
        return await this.request(RequestMethod.GET, API.WALLET_TRANSACTION_STATUS, {
            params: {},
        });
    }
    /**
     * 设置用户交易密码
     * @returns
     */
    public static async setTransactionPassword(password: string): Promise<any> {
        return await this.request(RequestMethod.POST, API.WALLET_SET_TRANSACTIONPWD, {
            data: { password: password },
        });
    }
    /**
     * 校验交易短信
     * @returns
     */
    public static async verifyTransactionPassword(phone: number, code: string): Promise<any> {
        return await this.request(RequestMethod.POST, API.WALLET_VERIFY_TRANSACTIONPWD, {
            data: { phone: phone, code: code },
        });
    }
    /**
     * 修改用户交易密码
     * @returns
     */
    public static async changeTransactionPassword(password: string): Promise<any> {
        return await this.request(RequestMethod.POST, API.WALLET_CHANGE_TRANSACTIONPWD, {
            data: { password: password },
        });
    }
    /**
     * 提现
     * @returns
     */
    public static async withdraw(options: WithdrawEntity): Promise<any> {
        return await this.request(RequestMethod.POST, API.WALLET_WITHDRAW, {
            data: {
                password: options.password,
                amount: parseInt(options.amount),
                bank_id: options.bank_id,
            },
        });
    }

    /**
     * 提现限额查询
     * @returns
     */
    public static async getWithdrawalRules(): Promise<any> {
        return await this.request(RequestMethod.GET, API.WALLET_WITHDRAW_RULES, {
            params: {},
        });
    }
}

export default WalletService;
