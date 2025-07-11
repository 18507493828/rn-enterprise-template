import { Platform, StyleSheet } from 'react-native';
import { scaleSize } from '../utils/ScreenUtil';

// 基础颜色定义
export const COLORS = {
    primary: '#1C2022', // 主色
    secondary: '#909090', // 次要色
    dary: '#999999', // 白底文字次要色
    link: '#3AB6EC', //链接色
    secondaryBack: '#F3F3F3', // 次要色
    secondaryBackGroud: '#F7F7F7', // 背景色
    danger: '#e74c3c', // 错误色
    redColor: '#FF5555', //红色
    warning: '#f1c40f', // 警告色
    primarySecondYellow: '#FFD796', // 邀请淡黄色
    primaryYellow: '#FF9F00', // 邀请黄色
    success: '#2ecc71', // 成功色
    greenPrimary: '#6CA940', // 主绿色
    text: '#0D0D0D', // 文本主色
    textSecondary: '#666666', // 文本次色
    placeholderTextColor: '#BBB', // 文本次色
    background: '#FFFFFF', // 背景色
    border: '#dcdde1', // 边框色
    white: '#ffffff', // 白色
    black: '#000000', // 黑色
    overlay: 'rgba(0, 0, 0, 0.5)', // 半透明遮罩
    transparent: 'rgba(255,255,255,0)', // 全透明
    lineColor: '#E6E6E6',
    grayColor: '#eee',
    inputGray: '#F3F3F3',
    disable: '#d6d6d6', // 不可点击
    disableBackColor: '#F5F5F5', // 禁用时背景颜色变灰
    disableBorderColor: '#D3D3D3', // 禁用时边框颜色变灰
    contentBackColor: '#F7F7F7', //灰色背景颜色
};

// 字体大小
export const FONT_SIZES = {
    xxSmall: scaleSize(10),
    xSmall: scaleSize(12),
    small: scaleSize(14),
    medium: scaleSize(16),
    xMedium: scaleSize(18),
    large: scaleSize(20),
    xLarge: scaleSize(24),
    xxLarge: scaleSize(30),
    xxxLarge: scaleSize(32),
    xxxxLarge: scaleSize(40),
};

// 字体权重
export const FONT_WEIGHTS = {
    regular: '400',
    bold: '700',
    semiBold: '600',
    light: '300',
};

// 间距
export const SPACING = {
    xSmall: scaleSize(4),
    small: scaleSize(8),
    xMedium: scaleSize(12),
    medium: scaleSize(16),
    large: scaleSize(24),
    xLarge: scaleSize(32),
    xxLarge: scaleSize(36),
    xxxLarge: scaleSize(44),
    huge: scaleSize(52),
    xHuge: scaleSize(60),
};

// 圆角
export const BORDER_RADIUS = {
    small: scaleSize(4),
    medium: scaleSize(8),
    large: scaleSize(16),
    xLarge: scaleSize(24),
    full: 999, // 全圆
};

// 阴影
export const SHADOW = {
    light: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    medium: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    heavy: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
};

// 默认容器内边距
export const DEFAULT_CONTAINER_SPACE = SPACING.medium;

// 默认底部安全边距
export const DEFAULT_BOTTOM_SPACE = SPACING.xLarge;

// 默认顶部安全边距
export const DEFAULT_TOP_SPACE = SPACING.medium;

// 默认 弹出键盘与textinput底部高度边距
export const DEFAULT_KEYBOARD_TOP_SPACE = scaleSize(150);
// 通用样式
export const COMMON_STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
    text: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    },
    textBold: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        fontWeight: FONT_WEIGHTS.bold,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.medium,
        borderRadius: BORDER_RADIUS.xLarge,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.medium,
        fontWeight: FONT_WEIGHTS.bold,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: BORDER_RADIUS.small,
        padding: SPACING.small,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    },
    centerVertically: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadowLight: {
        ...SHADOW.light,
    },
    shadowMedium: {
        ...SHADOW.medium,
    },
    shadowHeavy: {
        ...SHADOW.heavy,
    },
    headerLeftContainer: {
        paddingLeft: DEFAULT_CONTAINER_SPACE, // 自定义左边距
    },
    headerRightContainer: {
        paddingRight: DEFAULT_CONTAINER_SPACE, // 自定义右边距
    },
    flexBtw: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
    flexBtwNoScale: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRowCenter: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
