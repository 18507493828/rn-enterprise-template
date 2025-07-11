import { ENSURE } from '../lib/Assert';
import { LOGI, LOGW } from '../lib/Logger';

const TAG = 'TaskManager';

type Task = { [eventName: string]: (params?: any) => Promise<void> | void };
declare global {
    var taskList: Task[] | undefined;
}

export default class TaskManager {
    /**
     * 添加任务
     * @param newTaskList 任务列表
     */
    public static addEvent(newTaskList: Task[] = []): void {
        newTaskList.forEach(newObj => {
            const eventName = Object.keys(newObj)[0];
            const eventValue = Object.values(newObj)[0];

            ENSURE(typeof eventValue === 'function').msg(TAG, `The ${eventName} is not a function`);

            const taskList = global.taskList;

            if (!Array.isArray(global.taskList)) {
                global.taskList = [];
            }

            if (Array.isArray(taskList)) {
                let count = 0;
                taskList.forEach((obj, index) => {
                    if (Object.keys(obj)[0] === eventName) {
                        global.taskList?.splice(index, 1, newObj);
                    } else {
                        count += 1;
                    }
                });

                if (taskList.length === count) {
                    global.taskList.push(newObj);
                    LOGI(TAG, 'Delay to execute the task', eventName);
                }
            } else {
                global.taskList = [newObj];
                LOGI(TAG, 'Delay to execute the task', eventName);
            }
        });
    }

    /**
     * 根据事件名获得任务函数
     * @param eventName 事件名称
     */
    public static getEvent(eventName: string): ((params?: any) => Promise<void> | void) | null {
        if (global.taskList && global.taskList.length > 0) {
            const taskObj = global.taskList.find(task => Object.keys(task)[0] === eventName);
            if (taskObj) {
                return taskObj[eventName];
            } else {
                LOGW(TAG, eventName);
            }
        }
        return null;
    }

    /**
     * 执行指定任务
     * @param eventName 事件名称
     * @param params 传递参数
     */
    public static async executeEvent(eventName: string, params: any = ''): Promise<boolean> {
        const event = TaskManager.getEvent(eventName);
        if (event) {
            LOGI(TAG, 'Start executing the task', eventName);
            TaskManager.destruction([eventName]);
            await event(params);
            return true;
        }
        return false;
    }

    /**
     * 依次执行队列中的任务
     * @param eventNameList 事件名称列表
     */
    public static execute(eventNameList: string[] = []): void {
        if (global.taskList && global.taskList.length > 0) {
            if (!eventNameList.length) {
                global.taskList.forEach(obj => {
                    LOGI(TAG, 'Start executing the task', Object.keys(obj)[0]);
                    Object.values(obj)[0]();
                });
                global.taskList = undefined;
            } else {
                for (let index = global.taskList.length - 1; index >= 0; index -= 1) {
                    const eventObj = global.taskList[index];
                    const eventName = Object.keys(eventObj)[0];
                    if (eventNameList.includes(eventName)) {
                        LOGI(TAG, 'Start executing the task', eventName);
                        Object.values(eventObj)[0]();
                        global.taskList.splice(index, 1);
                    }
                }
            }
        }
    }

    /**
     * 任务销毁
     * @param eventNameList 事件名称列表
     */
    public static destruction(eventNameList: string[] = []): void {
        if (Array.isArray(global.taskList)) {
            if (!eventNameList.length) {
                global.taskList.forEach(obj => {
                    LOGI(TAG, 'Destruction the task', Object.keys(obj)[0]);
                });
                global.taskList = undefined;
                return;
            }

            for (let index = global.taskList.length - 1; index >= 0; index -= 1) {
                const eventName = Object.keys(global.taskList[index])[0];
                if (eventNameList.includes(eventName)) {
                    global.taskList.splice(index, 1);
                    LOGI(TAG, 'Destruction the task', eventName);
                }
            }
        }
    }
}
