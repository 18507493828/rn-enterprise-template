export default {
    OK: 200, // 成功

    // 通用请求错误
    BAD_REQUEST: 400, // 请求错误
    UNAUTHORIZED: 401, // 未授权
    FORBIDDEN: 403, // 禁止访问
    NOT_FOUND: 404, // 资源未找到
    TOO_MANY_REQUESTS: 429, // 请求过多，限流保护
    INTERNAL_SERVER_ERROR: 500, // 服务器内部错误
    UNPROCESSABLE_ENTITY: 422, // 校验无效

    // 用户相关
    INVALID_VERIFICATION_CODE: 201001, // 无效的验证码
    INVALID_PHONE_NUMBER: 201002, // 无效的手机号
    INVALID_COUNTRY_ID: 201003, // 无效的国家 ID
    PASSWORD_INCORRECT: 201004, // 密码不正确
    NO_TOKEN_PROVIDED: 201005, // 未提供令牌
    SESSION_EXPIRED: 201006, // 会话已过期
    INVALID_TOKEN: 201007, // 无效令牌
    SEND_MSG_LIMIT: 201008, //发送短信被锁定

    // 用户子模块
    USER_RECORD_NOT_EXIST: 202001, // 用户记录不存在
    ACCOUNT_PASSWORD_ERROR: 202002, // 账号或密码错误
    USER_ID_INCORRECT: 202004, // 用户 ID 不正确
    USER_UPDATE_FAILED: 202005, // 用户信息更新失败
    LOGIN_LIMIT_REGISTER: 202006, // 限制注册

    // 钱包相关
    INSUFFICIENT_BALANCE: 203001, // 余额不足
    WALLET_TRANSACTION_NO_PASSWORD: 203002, // 未设置交易密码
    WALLET_TRANSACTION_LOCKED: 203003, // 交易密码已锁定
    WALLET_INVALID_PASSWORD: 203004, // 无效的交易密码
    WALLET_LIMIT_MONEY: 203005, // 最低限额
    WALLET_TRANSACTION_OK: 200, // 交易校验成功
    WALLET_BANK_ACCOUNT_NO_EXISTS: 206001, // 银行卡不存在
    WALLET_BANK_NAME_DIFFERENT: 206002, // 银行名称不匹配
    WALLET_BANK_ACCOUNT_EXISTS: 206004, // 银行已经存在

    // 订单模块
    DATE_INPUT_ERROR: 204001, // 开始时间不能大于结束时间
    INVALID_TYPE: 204002, // 无效的类型
    CARD_RATE_UPDATED: 204003, // 汇率已更新，请重新提交

    // 系统模块
    SMS_TEMPLATE_NOT_EXIST: 205001, // 短信模板不存在
    SMS_SENDING_TOO_FREQUENT: 205002, // 发送过于频繁，请稍后再试
    ILLEGAL_OPERATION: 205003, // 非法操作
    PHONE_NUMBER_NOT_EXIST: 205004, // 输入的手机号码不存在

    // 卡交易
    SELL_CARD_RATE_UPDATED: 209010, // 汇率已变化，请重新提交
};
