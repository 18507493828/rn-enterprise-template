import RootNavigation from '@navigation/RootNavigation';
import { DeviceEventEmitter } from 'react-native';
import { PUSH_TYPE } from './PushType';
import { EVENT_NAMES } from '../EventManager/EventNames';
import { CommonController } from '@business/controller';

export default class PushManager {
    //push点击事件
    public static puchClick = (additionalData: AdditionalData) => {
        let intentId = additionalData?.order_id;
        //settimeout是为了处理冷启动能正常调整（app进程被杀死后 点击推送消息的冷启动），否则无法跳转
        setTimeout(() => {
            if (additionalData?.notice_type === PUSH_TYPE.TRANSACTION && intentId) {
                //交易详情
                RootNavigation.resetSaveScreen([
                    { name: 'MainScreen' },
                    { name: 'TranSactionDetailScreen', params: { order_id: intentId } },
                ]);
            } else if (additionalData?.notice_type === PUSH_TYPE.WITHDRAW && intentId) {
                //提现详情
                RootNavigation.resetSaveScreen([
                    { name: 'MainScreen' },
                    { name: 'WithdrawalDetailScreen', params: { id: intentId } },
                ]);
            }
        }, 1000);
    };

    //新消息 Transaction刷新
    public static puchTransaction = async (additionalData: AdditionalData) => {
        setTimeout(() => {
            //根据通知类型做的操作
            this.handleNotificationByType(additionalData?.notice_type);

            DeviceEventEmitter.emit(EVENT_NAMES.TRANSACTION, {
                type: additionalData?.notice_type,
            });
        }, 1000);
    };

    public static handleNotificationByType = async (noticeType: string) => {
        const notificationHandlers = {
            [PUSH_TYPE.TRANSACTION]: async () => {
                await CommonController.getUserInfo();
            },
            [PUSH_TYPE.WITHDRAW]: async () => {
                await CommonController.getUserInfo();
            },
        };
        const handler = notificationHandlers[noticeType as keyof typeof notificationHandlers];
        handler && (await handler());
    };
}
