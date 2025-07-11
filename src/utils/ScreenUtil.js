import { Dimensions, PixelRatio } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SCREEN_WIDTH = Dimensions.get('window').width; // 设备的宽度
export const SCREEN_HEIGHT = Dimensions.get('window').height; // 设备的高度

const BASE_WIDTH = 375; // 竖屏设计稿宽度
const BASE_HEIGHT = 812; // 竖屏设计稿高度

/**
 * 尺寸适配
 * @param {*} size
 * @returns
 */
export const scaleSize = size => {
    const { width, height } = Dimensions.get('window');
    const isPortrait = height > width;
    const base = isPortrait ? BASE_WIDTH : BASE_HEIGHT;

    // 比例计算需要避免出现小数
    return Math.round((width / base) * size);
};

/**
 * 自定义 Hook，用于获取布局信息
 * @returns
 */
export const useLayoutInfo = () => {
    let headerHeight = useHeaderHeight(); // 获取导航头部高度
    headerHeight = headerHeight || (Platform.OS === 'android' ? 56 : 44); // 默认导航栏高度

    const insets = useSafeAreaInsets(); // 获取安全区域的 Insets（适用于 iOS 等平台）
    const statusBarHeight = insets.top; // 获取状态栏高度
    const bottomInset = insets.bottom; // 获取底部安全区域高度

    // 兼容性检查
    const safeStatusBarHeight = statusBarHeight || (Platform.OS === 'android' ? 24 : 20);
    const safeBottomInset = bottomInset || (Platform.OS === 'android' ? 0 : 34);

    // 计算窗口高度减去头部和状态栏高度后的可用高度
    const availableHeight = Dimensions.get('window').height - headerHeight - safeStatusBarHeight - safeBottomInset;

    return { availableHeight, headerHeight, statusBarHeight: safeStatusBarHeight, insets, bottomInset: safeBottomInset };
};
