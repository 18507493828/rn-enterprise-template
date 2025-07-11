import CommonController from '@business/controller/CommonController';
import UserStorage from '@business/storage/UserStorage';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { OneSignal } from 'react-native-onesignal';

const OneSignalInit = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    const userInfo = await UserStorage.getInfo();
    if (userInfo && userInfo.id) {
        //推送订阅id用用户的userid
        OneSignal.login(userInfo?.id.toString());
        //绑定设备id
        CommonController.bindPush({ id: deviceId, platform: Platform.OS });
    }
};

export default OneSignalInit;
