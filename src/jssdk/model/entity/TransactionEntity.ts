/**
 * @param status 状态
 * @param end_date 结束时间
 *  * @param start_date 开始时间
 * @param type 类型
 * @returns
 */
interface TranscationEntity {
    page: number;
    page_size: number;
    type: string;
    start_date: string;
    end_date: string;
    status: string;
}

/**
 * @param status 状态
 * @param end_date 结束时间
 *  * @param start_date 开始时间
 * @param type 类型
 * @returns
 */
interface WithdrawalEntity {
    page: number;
    page_size: number;
    start_date: string;
    end_date: string;
    status: string;
}

export type { TranscationEntity, WithdrawalEntity };
