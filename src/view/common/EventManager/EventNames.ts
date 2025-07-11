export const EVENT_NAMES = {
    LOGOUT: 'logoutEvent', // 注销事件
    APP_STATE_CHANGE: 'appStateChangeEvent', // 应用前后台变化
    NETWORK_CHANGE: 'networkChangeEvent', // 网络变化

    TRANSACTION: 'transaction', // 提现或者交易广播
    SELLECARD: 'sellecardEvent', // 卖卡确认页面如果汇率发生改变，通知卖卡页面也刷新。
} as const;
