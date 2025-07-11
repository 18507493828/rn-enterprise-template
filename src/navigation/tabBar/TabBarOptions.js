import HomeScreen from '@view/module/home/HomeScreen';
import TransactionScreen from '@view/module/transaction/TransactionScreen';
import { COLORS } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';

/**
 * 获取默认 Tab 配置
 */
export const getTabBarOptions = () => [
    {
        name: 'Home',
        title: 'Home',
        icon: 'home',
        i18nName: 'home',
        component: HomeScreen,
    },
    {
        name: 'Transaction',
        title: 'Transaction',
        icon: 'transaction',
        i18nName: 'transaction',
        component: TransactionScreen,
    },
];

/**
 * 默认的 TabBar配置
 */
export const defaultScreenOptions = {
    tabBarStyle: {
        backgroundColor: '#fff',
    },
    tabBarShowLabel: true,
    tabBarLabelStyle: {
        fontSize: scaleSize(10),
        marginBottom: 0,
    },
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.secondary,
    headerStyle: {
        elevation: 0, // Android 移除阴影
        shadowOpacity: 0, // iOS 移除阴影
    },
};
