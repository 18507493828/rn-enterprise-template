import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();
import { useRoute } from '@react-navigation/native';
class RootNavigation {
    /**
     * 路由导航方法 - navigate
     * @param name 路由名称
     * @param params 路由参数
     */
    navigate(name, params) {
        if (navigationRef.isReady()) {
            navigationRef.navigate(name, params);
        }
    }

    /**
     * 返回上一页
     */
    goBack() {
        if (navigationRef.isReady() && navigationRef.canGoBack()) {
            navigationRef.goBack();
        }
    }

    /**
     * 返回指定页面
     * @param name 目标页面的路由名称
     * @param params 可选的路由参数
     */
    goTo(name, params) {
        navigationRef.reset({
            index: 0,
            routes: [{ name, params }],
        });
    }
    /**
     * 返回指定页面 并且保留某一个页面放
     * @param routes 为需要保留的页面和 跳转的页面
     *
     */
    resetSaveScreen(routes) {
        if (navigationRef.isReady()) {
            navigationRef.reset({
                index: 1,
                routes: routes,
            });
        }
    }

    /**
     * 获取当前路由
     * @returns 当前路由名称
     */
    getCurrentRoute() {
        if (navigationRef.isReady()) {
            return navigationRef.getCurrentRoute();
        }
        return null;
    }

    /**
     * 获取当前路由状态
     * @returns 当前路由状态
     */
    getState() {
        if (navigationRef.isReady()) {
            return navigationRef.getRootState();
        }
        return null;
    }

    /**
     * 动态设置路由参数
     * @param name 路由名称
     * @param params 路由参数
     */
    setParams(name, params) {
        if (navigationRef.isReady()) {
            const currentRoute = this.getCurrentRoute();
            if (currentRoute && currentRoute.name === name) {
                navigationRef.setParams(params);
            }
        }
    }

    /**
     * 设置 TabBar 参数
     * @param routeName 路由名称
     * @param options TabBar 配置
     */
    setTabBarOptions(routeName, options) {
        if (navigationRef.isReady()) {
            // 找到目标路由并设置 TabBar 选项
            const state = this.getState();
            const route = state?.routes.find(r => r.name === routeName);
            if (route) {
                route.state = { ...route.state, options };
            }
        }
    }

    /**
     * 动态设置堆栈或抽屉导航器参数
     * @param routeName 路由名称
     * @param options 配置项
     */
    setNavigatorOptions(routeName, options) {
        if (navigationRef.isReady()) {
            const state = this.getState();
            const route = state?.routes.find(r => r.name === routeName);
            if (route) {
                route.state = { ...route.state, options };
            }
        }
    }
}

export default new RootNavigation();
