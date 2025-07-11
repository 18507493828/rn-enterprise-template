import React, { useEffect, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const useStatusBarStyle = (barStyle = 'light-content') => {
    // 初始设置状态栏字体颜色
    useEffect(() => {
        StatusBar.setBarStyle(barStyle);
    }, [barStyle]);

    // 页面获得焦点时恢复设置的状态栏字体颜色
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle(barStyle);
            return () => {
                // 页面失去焦点时恢复相反的状态栏样式
                StatusBar.setBarStyle(
                    barStyle === 'light-content' ? 'dark-content' : 'light-content',
                );
            };
        }, [barStyle]),
    );
};

export default useStatusBarStyle;
