// 交易收入状态
export enum TransactionInComeStatus {
    PROCESSING = 1, //处理中
    FAILED = 2, //失败
    SUCCESS = 3, //成功
}
// 交易控制台扭转状态
export enum TransactionConsoleTurnoverStatus {
    FAILED = 12, //扭转失败
    SUCCESS = 11, //扭转成功
}

// 交易提现状态
export enum TransactionWithDrawStatus {
    PROCESSING = 0, //处理中
    SUCCESS = 1, //成功
    FAILED = 2, //失败
}

// 交易收入类型
export enum TransactionInComeType {
    Defalt = 0, //默认值
    Sales = 1, //卖卡收入
    Reward = 2, //佣金收入
    Commission = 3, //活动收入
}
// 优惠券状态
export enum CouponStatus {
    USING = 0, //处理中
    SUCCESS = 1, //使用成功
    TURNOVER_FAILED = 2, //状态扭转导致的优惠券失败
    FAILED = 12, //金额不达不到要求
}
