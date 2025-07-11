/**
 * @param year 状态
 * @param month 结束时间
 * @param week 星期
 *  @param user_level 用户等级
 * @returns
 */
interface RankListEntity {
    year?: string;
    month?: string;
    week?: string;
    user_level?: string;
}

interface RankReawardEntity {
    type?: string;
    user_level?: string;
}
export type { RankListEntity, RankReawardEntity };
