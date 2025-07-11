import { HomeController, NoticeController } from '@business/controller';
import { LOGI } from '@jssdk/lib/Logger';
import { activityManager } from '@view/common/ActivityManager';
import { checkAppUpdate } from '@view/common/UpdateManager';

const TAG = 'appStateChangeEvent';

/**
 * 全局处理AppState变化
 * @param options
 */
const appStateChangeEvent = async (nextAppState: string) => {
    LOGI(TAG, 'AppState changed to', nextAppState);
    if (nextAppState == 'active') {
        // DeviceEventEmitter.emit('refreshGiftCardList');

        //前后台切换刷新卡种列表的数据
        HomeController.getGiftCardList();

        const isTokenValid = await HomeController.checkTokenValidity();
        //获取消息数据
        isTokenValid && NoticeController.getMessageNumber(),
            // 检查是否需要显示升降级弹窗
            activityManager();

        //检查是否需要强制更新
        checkAppUpdate();
    }
};

export default appStateChangeEvent;
