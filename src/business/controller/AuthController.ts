import BaseController from './BaseController';
import { ErrorDescription } from '@business/config/ErrorDescription';
import UserStorage from '@business/storage/UserStorage';
import ResultCode from '@jssdk/config/ResultCode';
import { ApiError } from '@jssdk/core/errors';
import {
    ForgetEntity,
    LoginEntity,
    RegisterEntity,
    UpdateUserEntity,
} from '@jssdk/model/entity/UserEntity';
import { UserService } from '@jssdk/model/service';
import { timeWithFomatterHHmmss } from '@utils/dayjs';
import UserStore from '@lib/zustand/UserStore';
import { setAnyStorage } from '@utils/StorageUtil';

class AuthController extends BaseController {
    protected static TAG = 'AuthController';

    /**
     *
     * 账号密码登录
     * @param options
     * @returns
     */
    static async pwdLogin(options: LoginEntity) {
        let status = false;
        try {
            const { data } = await UserService.login(options);
            let userInfo = data;
            status = true;
            userInfo.showUserName = `${data.first_name} ${data.last_name}`;
            setAnyStorage('privacy', 'isSelect');
            UserStore.getState().setUserInfo(userInfo);
            UserStore.getState().setCurrency(data.currency);
            UserStorage.save(userInfo);
        } catch (error) {
            this.handleError({ error });
        }
        return status;
    }

    /**
     * 退出登录
     * @returns
     */
    static async logout() {
        let isLogoutSuccess = false;
        try {
            await UserService.logout();
            isLogoutSuccess = true;
        } catch (error) {
            this.handleError({ error });
        }
        return isLogoutSuccess;
    }

    /**
     * 注册
     * @param options
     * @returns
     */
    static async register(options: RegisterEntity) {
        let status = false;

        try {
            await UserService.register(options);
            status = true;
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.code === ResultCode.LOGIN_LIMIT_REGISTER) {
                    const blockedUntil = (error.data as any)?.blocked_until;
                    error.message = `${ErrorDescription[error.code]} ${timeWithFomatterHHmmss(blockedUntil)}`;
                }
            }
            this.handleError({ error });
        }

        return status;
    }

    /**
     * 忘记密码
     * @param options
     * @returns
     */
    static async forgotPassword(options: ForgetEntity) {
        let status = false;
        try {
            await UserService.forgotPassword(options);
            status = true;
        } catch (error) {
            this.handleError({ error });
        }
        return status;
    }

    /**
     * 更新用户信息
     * @param options
     * @returns
     */
    static async updateUserInfo(options: UpdateUserEntity) {
        let status = false;
        try {
            await UserService.updateUserInfo(options);
            status = true;
        } catch (error) {
            this.handleError({ error });
        }
        return status;
    }

    /**
     * 重置密码
     * @param old_password
     * @param new_password
     * @returns
     */
    static async resetPassword(old_password: string, new_password: string) {
        let status = false;
        try {
            await UserService.resetPassword(old_password, new_password);
            status = true;
        } catch (error) {
            this.handleError({ error });
        }
        return status;
    }

    /**
     * 删除账号
     * @param phone
     * @param password
     * @returns
     */
    static async deleteAccout(phone: string, password: string) {
        let status = false;
        try {
            await UserService.deleteAccout(phone, password);
            status = true;
        } catch (error) {
            this.handleError({ error });
        }
        return status;
    }
}

export default AuthController.createStaticProxy();
