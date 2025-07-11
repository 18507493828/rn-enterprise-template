/**
 * 用户名/密码登录
 * @param username 用户名
 * @param password 密码
 * @returns
 */
interface LoginEntity {
    phone: string;
    password: string;
    country_id: number;
    verification_code: string;
    type: number;
    device_id: string;
}

/**
 * 用户注册
 * @param username 用户名
 * @param password 密码
 * @returns
 */
interface RegisterEntity {
    first_name: string;
    last_name: string;
    phone: string;
    password: string;
    verification_code: string;
    invite_code: string;
    country_id: number;
    device_id: string;
}

/**
 * 忘记密码
 * @param username 用户名
 * @param password 密码
 *  * @param country_id 国家id
 * @returns
 */
interface ForgetEntity {
    phone: string;
    password: string;
    verification_code: string;
    country_id: string;
}

/**
 * 更新用户信息
 * @param first_name
 * @param avatar_url 用户头像
 *  * @param last_name
 * @returns
 */
interface UpdateUserEntity {
    first_name: string;
    last_name: string;
    avatar_url: string;
}

export type { LoginEntity, RegisterEntity, ForgetEntity, UpdateUserEntity };
