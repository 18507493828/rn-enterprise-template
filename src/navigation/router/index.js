import { TransitionPresets, HeaderStyleInterpolators } from '@react-navigation/stack';
import TestScreen from '../../test/TestScreen';
import MainDrawer from '@navigation/drawer/MainDrawer';

/*{登录注册}*/
import LoginScreen from '@view/module/auth/LoginScreen';
import RegisterScreen from '@view/module/auth/RegisterScreen';
import ChangePassWordScreen from '@view/module/me/ChangePassWordScreen';
import ResetPasswordScreen from '@view/module/auth/ResetPasswordScreen';
import AccountDeletionScreen from '@view/module/auth/DeleteAccountScreen';
import BaseUrlScreen from '@view/module/auth/BaseUrlScreen';
/*webView*/
import WebViewScreen from '@view/module/webView';
import AppLauchScreen from '@view/module/guide/AppLauchScreen';
import GuideScreen from '@view/module/guide/GuideScreen';

// 默认栈导航器属性配置
const navigationOptions = {
    headerShown: true, // 不显示导航头
    gestureEnabled: true, // 禁止拖动
    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
    ...TransitionPresets.SlideFromRightIOS, // 基于 iOS 的滑动效果
    gestureDirection: 'horizontal', // 手势方向水平滑动
};

// 初始路由名
export const INIT_ROUTE_NAME = 'MainScreen';

// APP 启动页
export const APP_LAUNCH = 'AppLauchScreen';

export default {
    // 测试页，本地组件或者功能测试可以放在这里验证
    TestScreen: {
        screen: TestScreen,
        options: {
            ...navigationOptions,
            title: 'header_title_test',
        },
    },

    //启动页
    AppLauchScreen: {
        screen: AppLauchScreen,
        options: {
            ...navigationOptions,
            headerShown: false,
        },
    },

    //引导页
    GuideScreen: {
        screen: GuideScreen,
        options: {
            ...navigationOptions,
            headerShown: true,
            title: 'header_title_trading_guidelines',
        },
    },

    // webView
    WebViewScreen: {
        screen: WebViewScreen,
        options: {
            ...navigationOptions,
            headerShown: true,
        },
    },

    // 登录
    LoginScreen: {
        screen: LoginScreen,
        options: {
            ...navigationOptions,
            headerShown: true,
            title: '',
        },
    },
    // 注册
    RegisterScreen: {
        screen: RegisterScreen,
        options: {
            ...navigationOptions,
            headerShown: true,
            title: 'header_title_register',
        },
    },
    // 注册
    BaseUrlScreen: {
        screen: BaseUrlScreen,
        options: {
            ...navigationOptions,
            headerShown: true,
            title: 'header_title_baseUrl',
        },
    },
    // 修改密码
    ChangePassWordScreen: {
        screen: ChangePassWordScreen,
        options: {
            ...navigationOptions,
            headerShown: true,
            title: 'header_title_modify_password',
        },
    },
    // 修改密码
    ResetPasswordScreen: {
        screen: ResetPasswordScreen,
        options: {
            ...navigationOptions,
            headerShown: true,
            title: 'header_title_reset_password',
        },
    },
    // 删除账号
    AccountDeletionScreen: {
        screen: AccountDeletionScreen,
        options: {
            ...navigationOptions,
            headerShown: true,
            title: 'header_title_delete_account',
        },
    },

    // 主屏
    MainScreen: {
        screen: MainDrawer,
        options: {
            ...navigationOptions,
            headerShown: false,
        },
    },
};
