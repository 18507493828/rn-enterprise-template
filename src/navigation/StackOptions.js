import { scaleSize } from '@utils/ScreenUtil';
import {
    FONT_SIZES,
    FONT_WEIGHTS,
    DEFAULT_CONTAINER_SPACE,
    COLORS,
    SPACING,
} from '@common/CommonStyle';
import ClickableItem from '@components/ClickableItem';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { Header } from '@react-navigation/elements/src/Header/Header';

/**
 * 获得栈默认配置
 * @param {*} param0 - 包括 `navigation` 和其他必要参数
 * @returns 栈的默认配置对象
 */
export const getDefaultStackOptions = ({ navigation }, t) => {
    return {
        CardStyleInterpolators: CardStyleInterpolators.forHorizontalIOS,
        // 样式设置
        headerTitleStyle: {
            fontSize: FONT_SIZES.medium,
            fontWeight: FONT_WEIGHTS.bold, // 标题加粗
            color: COLORS.black, // 配置标题颜色
        },
        headerStyle: {
            elevation: 0, // 移除 Android 阴影
            shadowOpacity: 0, // 移除 iOS 阴影
            backgroundColor: COLORS.white, // 可统一配置头部背景色
        },
        headerTitleAlign: 'center', // 标题居中
        headerShown: true, // 是否显示导航头，默认为显示
        headerShadowVisible: false, // 是否显示头部阴影，设置为 false 则隐藏阴影
        headerBackButtonDisplayMode: 'minimal', // 设置返回按钮样式，'minimal' 移除文字，仅显示图标
        animation: 'slide_from_right', // 默认动画效果，滑动进入

        // 逻辑优化
        detachInactiveScreens: true, // 分离未活动的屏幕，提升内存使用效率
        detachPreviousScreen: !navigation.isFocused(), // 如果当前屏幕不聚焦，分离上一个屏幕
        freezeOnBlur: true, // 当前屏幕失去焦点时冻结，避免多余的渲染
        //tips: RN 0.76 以后版本，Header 组件上，因为 onLayout 高度不断重新计算，会导致闪屏抖动
        header: ({ back, options }) => {
            options.title = t(options.title);
            return <Header {...options} />;
        },

        // 自定义返回按钮
        headerLeft: ({ canGoBack }) => {
            return (
                <ClickableItem
                    icon="back"
                    hitSlop={{ left: 30, right: 30, top: 30 }}
                    iconSize={scaleSize(24)}
                    iconColor={COLORS.black}
                    style={{ marginLeft: DEFAULT_CONTAINER_SPACE - SPACING.xMedium }}
                    onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        }
                    }}
                />
            );
        },
    };
};
