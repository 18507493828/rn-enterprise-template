import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabBar from '@navigation/tabBar/MainTabBar';
import MeDrawerContent from '@view/module/me/core/MeDrawerContent';
import { useUserState } from '@lib/zustand';

// 创建 Drawer 导航器
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
    const { userInfo } = useUserState();
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false, swipeEnabled: userInfo?.id ? true : false }}
            drawerContent={props => <MeDrawerContent {...props} />}
        >
            <Drawer.Screen name="MainTabBar" component={MainTabBar} />
        </Drawer.Navigator>
    );
};

export default MainDrawer;
