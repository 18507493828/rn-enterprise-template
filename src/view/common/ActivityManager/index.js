import { SceneTask } from '../SceneManager';
import { CommonController } from '@business/controller';
import { UserStorage } from '@business/storage';

export const activityManager = async () => {
    // 如果未登录，则不请求
    const userInfo = await UserStorage.getInfo();
    if (!userInfo?.id) return;

    //前后台网络接口是异步， home页面加载是同步，所以首页任务需要预加载
    SceneTask.addHomeLevelPostUpTask(async () => {
        //是否需要显示升级弹窗
        const data = await CommonController.getLevelNotification();
        if (data) {
            const { isLevelUp, isLevelDown, level } = data;

            //TODO: 比如前后台切换执行任务，当时储存storage的数据， 等这些storage清除，或者更新时候。
            //我们再去执行任务的时候，永远读的是 前后台切换执行任务，当时储存storage的数据。
        }
    });
};
