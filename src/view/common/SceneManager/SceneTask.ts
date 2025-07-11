import { LOGI } from '@jssdk/lib/Logger';
import { TASK_NAMES } from './TaskConstants';
import TaskManager from '@jssdk/core/TaskManager';

const TAG = 'SceneTask';

export default class SceneTask {
    /**
     * 添加首页初始化完成后，用户登出时执行任务
     * @param {*} task
     */
    public static addHomeInitPostLogoutTask(task: any) {
        LOGI(TAG, 'addHomeInitPostLogoutTask');
        TaskManager.addEvent([{ [TASK_NAMES.HOME_INIT_POST_LOGOUT]: task }]);
    }

    /**
     * 升级后执行任务
     * @param {*} task
     */
    public static addHomeLevelPostUpTask(task: any) {
        LOGI(TAG, 'addHomeLevelPostUpTask');
        TaskManager.addEvent([{ [TASK_NAMES.HOME_LEVEL_POST_UP]: task }]);
    }

    /**
     * 降级后执行任务
     * @param {*} task
     */
    public static addIntroLevelPostDownTask(task: any) {
        LOGI(TAG, 'addIntroLevelPostDownTask');
        TaskManager.addEvent([{ [TASK_NAMES.INTROLEVEL_POST_DOWN]: task }]);
    }

    /** ************* 下面是任务执行场景 ************* **/

    /**
     * 执行所有首页初始化完成后的任务
     */
    public static executeHomeInitPostTasks() {
        TaskManager.execute([TASK_NAMES.HOME_INIT_POST_LOGOUT]);
    }

    /**
     * Home页面执行升级任务
     */
    public static executeUpgradeTasks() {
        TaskManager.execute([TASK_NAMES.HOME_LEVEL_POST_UP]);
    }
    /**
     * 等级详情页面执行降级任务
     */
    public static executeDowngradeTasks() {
        TaskManager.execute([TASK_NAMES.INTROLEVEL_POST_DOWN]);
    }
}
