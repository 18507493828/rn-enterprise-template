import { LOGI } from '@jssdk/lib/Logger';
import { DeviceEventEmitter } from 'react-native';

const TAG = 'networkChangeEvent';
/**
 * 全局处理网络状态变化
 * @param state 网络状态信息
 */
const networkChangeEvent = (state: any) => {
    LOGI(TAG, 'Network status changed:', JSON.stringify(state));
};

export default networkChangeEvent;
