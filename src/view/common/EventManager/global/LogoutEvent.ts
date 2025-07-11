import { OneSignal } from 'react-native-onesignal';
import Intercom from '@intercom/intercom-react-native';
import { Hud, Alert } from '@components/index';
import { LOGE, LOGI } from '@jssdk/lib/Logger';
import RootNavigation from '@navigation/RootNavigation';
import { getStorageModule } from '@jssdk/lib/Storage';
import UserStore from '@lib/zustand/UserStore';
import AuthController from '@business/controller/AuthController';
import UserStorage from '@business/storage/UserStorage';
import LastUserStorage from '@business/storage/LastUserStorage';
import TaskManager from '@jssdk/core/TaskManager';
import { LOGOUT_TYPE, getLogoutReasonByType } from '@jssdk/config/LogoutConstants';
import { t } from 'i18next';
import { LevelNotificationStorage } from '@business/storage';

const TAG = 'LogoutEvent';

/**
 * 处理注销流程
 * @param options
 */
const logoutEvent = async (options: any) => {
    // 默认注销类型是主动注销
    const logoutType = options?.code ?? LOGOUT_TYPE.USER_INITIATED;
    const logoutReason = getLogoutReasonByType(logoutType); // 获取具体的注销原因
    LOGI(
        TAG,
        `The logout process has started. Logout type: ${logoutType}, Reason: ${logoutReason}`,
    );

    // 使用映射方式处理不同类型的登出
    const events = {
        [LOGOUT_TYPE.USER_INITIATED]: handleUserInitiatedLogout,
        [LOGOUT_TYPE.AUTHENTICATION_FAILED]: handleAuthenticationFailedLogout,
        [LOGOUT_TYPE.ACCOUNT_DELETION]: () => handleAccoutDeletionLogout(options),
    };
    const event = events[logoutType as keyof typeof events];
    const success = event ? await event() : false;

    // 调用注销成功后的逻辑
    if (success) {
        await handleLogoutSuccess(options);
    }
};

/**
 * 注销成功后的逻辑
 * @param options
 */
const handleLogoutSuccess = async (options: any) => {
    // 移除用户数据
    try {
        const userInfo = await UserStorage.getInfo();
        LastUserStorage.save(userInfo);

        // 重置用户信息
        await UserStore.getState().setUserInfo({});
        await UserStore.getState().setCurrency('');

        // 清除本地存储和用户数据
        await getStorageModule().removeItem('accessToken');
        await UserStorage.clear();
        await LevelNotificationStorage.clear();
    } catch (error) {
        LOGE(TAG, 'Failed to remove user data', error);
    }

    // 销毁所有待执行的任务
    TaskManager.destruction();

    // 注销 OneSignal 和清除推送消息
    OneSignal.logout();
    OneSignal.Notifications.clearAll();

    // 注销聊天
    Intercom.logout();

    // 重置路由并跳转至登录页
    RootNavigation.resetSaveScreen([{ name: 'MainScreen' }, { name: 'LoginScreen' }]);

    LOGI(TAG, 'Logout success');
};

/**
 * 用户主动注销的逻辑
 */
const handleUserInitiatedLogout = async () => {
    LOGI(TAG, 'User initiated logout');
    Hud.show();
    const isLogoutSuccess = await AuthController.logout();
    Hud.hide();

    if (!isLogoutSuccess) {
        LOGI(TAG, 'Server logout failed');
    }
    return true;
};

/**
 * 免密认证失败的注销逻辑(token失效)
 */
const handleAuthenticationFailedLogout = async () => {
    LOGI(TAG, 'Authentication failed logout');
    Alert.show({
        title: t('auth_log_out'),
        content: t('auth_access_token_logged_tip'),
        onlyShowConfirm: true,
    });
    return true;
};

/**
 * 用户删除账号的注销逻辑
 */
const handleAccoutDeletionLogout = async (options: any) => {
    LOGI(TAG, 'User account deletion logout');
    Hud.show();
    const isDeleteSuccess = await AuthController.deleteAccout(options?.phone, options?.password);
    Hud.hide();
    if (!isDeleteSuccess) {
        LOGI(TAG, 'delete failed');
    }
    return isDeleteSuccess;
};

export default logoutEvent;
