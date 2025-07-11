export default {
    //公用模块
    COUNTRY_LIST: '/sysCfg/country/list', // 国家列表
    USER_BALANCE: '/user/getBalance', //获取用户余额
    ADVERTISEMENT_LIST: '/ad/list', //广告列表
    BATCH_GET_SIGNATURE_URLS: '/upload/batch-signed-urls', // 获得文件上传需要的签名及存储桶地址
    REFRESH_TOKEN: '/user/refreshToken', //刷新token

    // 认证模块
    AUTH_LOGIN: '/user/login', // 用户登陆

    // 会话模块
    SESSION_REFRESH_TOKEN: '/user/refreshToken', // 刷新token
    SESSION_LOGOUT: '/user/logout', // 退出登陆

    // 用户模块
    USER_REGISTER: '/user/register', // 用户注册
    USER_GET_USER_INFO: '/user/info', // 获得用户信息
    USER_RESET_PASSWORD: '/user/reset-password', // 应用内修改密码
    USER_MODIFY_USER_INFO: '/user/update', // 修改用户信息
    USER_FORGOT_PASSWORD: '/user/forgot-password', // 忘记密码
    USER_GET_SMS_CODE: '/sysCfg/sendMsg', // 发送短信验证码
    USER_DELETE_USER: '/user/delete', // 注销用户

    // 礼品卡模块
    CARD_GET_ALL_GIFT_CARD_LIST: '/card/cardType/list', // 获得所有卡类型列表
    CARD_SELL_CARD: '/card/sell', // 交易礼品卡
    CARD_ASYNC_SELL_CARD: '/card/asyncSell', // 交易礼品卡(异步)
    CARD_GET_PRICE_RATE: '/card/calculate', // 获得当前卡实际价格汇率等信息（单卡汇率计算）
    CARD_ADD_FAVORITE: '/favorite/add', // 收藏卡
    CARD_FAVORITE_LIST: '/favorite/list', // 收藏卡列表
    CARD_REMOVE_FAVORITE: '/favorite/remove', // 移除收藏
    CARD_COUPON_LIST: '/coupon/list', // 优惠券列表

    // 交易
    TRANSACTION_STATISTICS: '/transaction/stat', // 交易统计
    WITHDRAWAL_LIST: '/withdrawal/list', // 提现记录
    WITHDRAWAL_DETAIL: '/withdrawal/detail', // 提现详情
    ORDERINCOME_LIST: '/order/income', // 订单列表
    ORDERINCOME_INFO: '/order/info', // 订单详情

    //钱包模块
    WALLET_BANK_LIST: '/bank/list', //用户银行列表
    WALLET_SYSTEM_LIST: '/sysCfg/bank/list', //系统银行列表
    WALLET_ADD_BANK: '/bank/create', //新增银行
    WALLET_DELETE_BANK: '/bank/delete', //删除银行卡
    WALLET_TRANSACTION_STATUS: '/transaction-password/query-status', //用户是否设置交易密码
    WALLET_SET_TRANSACTIONPWD: '/transaction-password/create', //设置交易密码
    WALLET_VERIFY_TRANSACTIONPWD: '/transaction-password/verify-code', //设置交易密码
    WALLET_CHANGE_TRANSACTIONPWD: '/transaction-password/reset-password', //设置交易密码
    WALLET_WITHDRAW: '/withdrawal/add', //提现
    WALLET_WITHDRAW_RULES: '/withdrawal/rules', //提现

    //黑白名单
    BLACK_LIST: '/blacklist/list', //黑名单列表
    WHITE_LIST: '/whitelist/list', //白名单列表
    FRIEND_LIST: '/friend/list', //朋友列表
    FRIEND_INFO: '/friend/info', //朋友交易详情
    REPORT_BLACK: '/blacklist/report', //黑名单上报

    // 排行榜
    RANK_SALESRULES: '/rank/salesRules', //排行榜规则
    RANK_SALELIST: '/rank/salesList', //排行榜列表
    RANK_CLAIMRANKREWARD: '/rank/claimRankReward', //领取排行奖励
    RANK_REWARDLIST: '/rank/rewardList', //排行榜奖励
    RANK_INVITATIONLIST: '/rank/invitationsList', //邀请排行榜
    RANK_INVITATIONRULES: '/rank/invitationsRules', //排行榜规则

    //推送
    BIND_PUSH: '/notification/bind', //绑定推送
    //预加载获取后台配置
    GLOBAL_CONFIGS: '/globalConfigs', //绑定推送

    //等级说明
    LEVEL_RECEIVE_REWARD: '/userLevel/receiveReward', //领取等级奖励
    LEVEL_GET_LEVEL_RULES: '/userLevel/getLevelRules', //获取等级规则
    LEVEL_GET_UNRECEIVED_REWARDS: '/userLevel/getUnreceivedRewards', //获取用户等级未领取的晋级奖励
    LEVEL_GET_ALL_REWARDS: '/userLevel/getAllRewards', // 获取用户所有的晋级奖励
    LEVEL_NOTIFICATION: '/userLevel/checkLevelChangeNotification', // 等级变化通知

    //消息模块
    NOTIFICATION_STATISTICS: '/notification/stat', //统计未读通知数量
    NOTIFICATION_LIST: '/notification/list', //通知列表
    NOTIFICATION_INFO: '/notification/info', //通知详情
    NOTIFICATION_READALL: '/notification/readAll', //所有未读通知标记已读
    NOTIFICATION_READ: '/notification/read', //通知标记已读
    NOTIFICATION_DELETE: '/notification/delete', //删除通知
};
