import API from '../../config/API';
import BaseService, { ApiResponse } from './BaseService';
import { RequestMethod } from '../../lib/Types';
import { LOGI } from '@jssdk/lib/Logger';
import ResultCode from '@jssdk/config/ResultCode';
import { getStorageModule } from '@jssdk/lib/Storage';
import { ForgetEntity, LoginEntity, RegisterEntity, UpdateUserEntity } from '../entity/UserEntity';

const TAG = 'SDK-UserService';

class UserService extends BaseService {
    public static async login(options: LoginEntity): Promise<any> {
        const result: ApiResponse = await this.request(RequestMethod.POST, API.AUTH_LOGIN, {
            data: { ...options },
        });
        if (result.code === ResultCode.OK) {
            getStorageModule().setItem('accessToken', result.data?.token);
        }
        return result;
    }

    /**
     * 退出登录
     */
    public static async logout(): Promise<any> {
        return await this.request(RequestMethod.POST, API.SESSION_LOGOUT, {
            data: {},
        });
    }

    /**
     * 忘记密码
     */
    public static async forgotPassword(options: ForgetEntity): Promise<any> {
        // 数据校验
        this.validateRequiredFields(
            `${TAG}-forgotPassword`,
            ['phone', 'password', 'verification_code', 'country_id'],
            options,
        );
        return await this.request(RequestMethod.POST, API.USER_FORGOT_PASSWORD, {
            data: {
                ...options,
            },
        });
    }

    public static async register(options: RegisterEntity): Promise<any> {
        // 数据校验
        this.validateRequiredFields(
            `${TAG}-register`,
            [
                'first_name',
                'last_name',
                'phone',
                'password',
                'verification_code',
                'invite_code',
                'country_id',
                'device_id',
            ],
            options,
        );
        return await this.request(RequestMethod.POST, API.USER_REGISTER, {
            data: {
                ...options,
            },
        });
    }

    /**
     * 更新用户信息
     */
    public static async updateUserInfo(options: UpdateUserEntity): Promise<any> {
        return await this.request(RequestMethod.POST, API.USER_MODIFY_USER_INFO, {
            data: {
                ...options,
            },
        });
    }

    /**
     * APP内修改密码
     */
    public static async resetPassword(old_password: string, new_password: string): Promise<any> {
        return await this.request(RequestMethod.POST, API.USER_RESET_PASSWORD, {
            data: {
                old_password,
                new_password,
            },
        });
    }

    /**
     * 删除账号
     */
    public static async deleteAccout(phone: string, password: string): Promise<any> {
        return await this.request(RequestMethod.POST, API.USER_DELETE_USER, {
            data: {
                phone,
                password,
            },
        });
    }
}

export default UserService;
