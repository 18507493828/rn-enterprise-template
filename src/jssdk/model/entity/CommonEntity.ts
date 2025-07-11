/**
 * @param numbers 状态
 * @param type 短信类型
 *  * @param country_id 国家id
 * @returns
 */
interface SendMsgEntity {
    numbers?: [string];
    type?: number;
    country_id?: number;
}

/**
 * @param code 返回状态
 * @param message 提示消息
 *  * @param data 数据源
 * @returns
 */
interface ResultEntity {
    data?: any;
    code?: number;
    message?: string;
}

/**
 * @param id 推送id
 * @param platform 推送平台
 * @returns
 */
interface BindIdEntity {
    id?: string;
    platform?: string;
}

export type { SendMsgEntity, ResultEntity, BindIdEntity };
