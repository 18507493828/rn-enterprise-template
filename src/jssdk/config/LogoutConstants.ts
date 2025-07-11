// 退出类型（用户行为）
export const LOGOUT_TYPE = {
    USER_INITIATED: 0, // 用户主动注销
    AUTHENTICATION_FAILED: 1, // 免密认证失败
    SERVER_ERROR: 2, // 服务器注销
    ACCOUNT_DELETION: 3, // 用户注销账号
    OTHER: 100, // 其他注销原因
} as const;

// 退出原因（具体注销的原因）
export const LOGOUT_REASON = {
    TOKEN_EXPIRED: 'token_expired', // token过期
    USER_REQUEST: 'user_request', // 用户请求注销
    FORCE_LOGOUT: 'force_logout', // 强制注销
    ACCOUNT_DELETION: 'account_deletion', // 用户注销账号
    UNKNOWN: 'unknown', // 未知原因
} as const;

// 对应关系：注销行为与原因的映射
export const LOGOUT_TYPE_TO_REASON: Record<
    (typeof LOGOUT_TYPE)[keyof typeof LOGOUT_TYPE],
    keyof typeof LOGOUT_REASON
> = {
    [LOGOUT_TYPE.USER_INITIATED]: 'USER_REQUEST', // 用户主动注销对应 "用户请求注销"
    [LOGOUT_TYPE.AUTHENTICATION_FAILED]: 'TOKEN_EXPIRED', // 免密认证失败对应 "token过期"
    [LOGOUT_TYPE.SERVER_ERROR]: 'FORCE_LOGOUT', // 服务器注销对应 "强制注销"
    [LOGOUT_TYPE.ACCOUNT_DELETION]: 'ACCOUNT_DELETION', // 用户注销账号
    [LOGOUT_TYPE.OTHER]: 'UNKNOWN', // 其他注销原因对应 "未知原因"
};

// 使用方式：根据退出类型获取具体的退出原因
export const getLogoutReasonByType = (
    logoutType: (typeof LOGOUT_TYPE)[keyof typeof LOGOUT_TYPE],
): string => {
    const reasonKey = LOGOUT_TYPE_TO_REASON[logoutType];
    return LOGOUT_REASON[reasonKey];
};
