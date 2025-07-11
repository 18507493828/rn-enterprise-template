// 推送通知类型
export const PUSH_TYPE = {
    TRANSACTION: 'CARD_SALE_STATUS', //交易
    WITHDRAW: 'WITHDRAW_STATUS', //提现
    RANK_SETTLEMENT: 'RANK_SETTLEMENT', //排行榜结算
    CARD_SALE: 'CARD_SALE_STATUS', //出卡
    RATE_CHANGE: 'RATE_CHANGE', //汇率变化
} as const;
