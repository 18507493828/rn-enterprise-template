import { useEffect, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getTabBarOptions, defaultScreenOptions } from './TabBarOptions';
import { useUserState } from '@lib/zustand';

// 场景显示
const SCENE_TABS = {
    production: ['Home', 'Transaction'], // 正式模式
};

const useTabBarManager = () => {
    const navigation = useNavigation();
    const { userInfo } = useUserState();
    const [screenOptions, setScreenOptions] = useState(defaultScreenOptions);
    const scene = 'production';

    // 根据当前场景过滤 Tab
    const tabBarData = useMemo(() => {
        const availableTabs = SCENE_TABS[scene] || []; // 获取当前场景可见的 Tabs
        return getTabBarOptions()
            .filter(tab => availableTabs.includes(tab.name)) // 只保留符合场景的 Tab
            .map(tab => ({
                ...tab,
                showBadge: tab.name === 'Transaction' ? 1 : 0, // 例如交易 Tab 可能需要角标
            }));
    }, [scene]);

    /**
     * 是否允许访问Tab
     * @param {*} tabName
     * @returns
     */
    const canAccessTab = tabName => {
        // 未登录且不是 Home，进入登陆页
        // if (!userInfo?.id && tabName !== 'Home') {
        //     return { canNavigate: false, action: 'LoginScreen' };
        // }

        // 其它 Tab 允许访问
        return { canNavigate: true };
    };

    /**
     * 处理 Tabbar 点击
     * @param {*} tabName
     * @returns {boolean}
     */
    const handleTabPress = tabName => {
        const { canNavigate, action } = canAccessTab(tabName);
        if (!canNavigate) {
            navigation.navigate(action);
        }
        return canNavigate;
    };

    return { handleTabPress, tabBarData, screenOptions };
};

export default useTabBarManager;
