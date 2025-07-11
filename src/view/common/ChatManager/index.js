import UserStorage from '@business/storage/UserStorage';
import Intercom from '@intercom/intercom-react-native';
import { scaleSize } from '@utils/ScreenUtil';
import { handleError } from '@utils/ErrorUtil';
import { Platform } from 'react-native';
const TAG = 'ChatManager';

/**
 *打开聊天
 */
export const openChat = async () => {
    const userInfo = await UserStorage.getInfo();
    try {
        Intercom.updateUser(userInfo?.intercom);
        /**
         * 特别说明：
         * - Android: 按照后台配置正常显示主页信息
         * - iOS: 由于SDK存在bug，需手动将主页设置为MessageComposer页面
         *   (该页面功能与主页完全一致)
         *
         * 注意：iOS上使用present方法会导致左滑屏幕卡顿问题
         *  sdkbug 地址： https://community.intercom.com/mobile-sdks-24/intercom-screen-freezing-issue-react-native-4625
         */
        Platform.OS === 'ios' ? Intercom.presentMessageComposer() : Intercom.present();
    } catch (error) {
        handleError({ TAG, error, methodName: 'initChat', showPrompt: false });
    }
};
//登录
export const loginChat = async () => {
    const userInfo = await UserStorage.getInfo();
    if (userInfo && userInfo.id) {
        try {
            await Intercom.loginUserWithUserAttributes(userInfo?.intercom);
            //如果来app内消息距离底部的距离
            Intercom.setBottomPadding(scaleSize(50));
        } catch (error) {
            handleError({ TAG, error, methodName: 'loginChat', showPrompt: false });
        }
    }
};
//IntercomWindowDidHideNotification 为ios专用监听，为了处理多次弹窗阻塞UI线程卡顿
export const IntercomHideListener = () => {
    const listener = Intercom.addEventListener('IntercomWindowDidHideNotification', () => {
        Intercom.hideIntercom();
    });
    return listener;
};
