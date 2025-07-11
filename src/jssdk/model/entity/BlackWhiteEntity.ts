/**
 * @param images 图片
 * @param account 账户
 *  * @param remark 备注
 * @returns
 */
interface ReportBlackEntity {
    images: [];
    account: string;
    remark: string;
}

/**
 * @param user_id 好友id
 * @param start_date 开始时间
 *  * @param end_date 截止时间
 * @returns
 */
interface FriendEntity {
    user_id: string;
    start_date: string;
    end_date: string;
}

export type { ReportBlackEntity, FriendEntity };
