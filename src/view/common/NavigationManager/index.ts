import { SceneTask } from '../SceneManager';
import { Keyboard, EmitterSubscription } from 'react-native';
/**
 * 全局路由导航管理，后续所有导航管理都在此模块中处理
 * 1. 键盘监听
 * 2. 页面跳转监听
 *......
 */

// 记录键盘状态
let isKeyboardVisible = false;
let keyboardShowListener: EmitterSubscription | null = null;
let keyboardHideListener: EmitterSubscription | null = null;

// 初始化键盘监听
export const initKeyboardListeners = () => {
    // 移除可能存在的旧监听器
    removeKeyboardListeners();

    // 添加新的监听器
    keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
        isKeyboardVisible = true;
    });

    keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
        isKeyboardVisible = false;
    });
};

// 移除键盘监听
export const removeKeyboardListeners = () => {
    if (keyboardShowListener) {
        keyboardShowListener.remove();
        keyboardShowListener = null;
    }

    if (keyboardHideListener) {
        keyboardHideListener.remove();
        keyboardHideListener = null;
    }
};

// 全局路由导航管理
export const navigationManager = async (state: any) => {
    // 如果键盘打开，则关闭键盘
    if (isKeyboardVisible) {
        Keyboard.dismiss();
    }
    if (state) {
        const currentRouteName = state.routes[state.index].name;
        if (currentRouteName === 'LevelIntroScreen') {
            // 执行降级任务
            SceneTask.executeDowngradeTasks();
        }
    }
};
