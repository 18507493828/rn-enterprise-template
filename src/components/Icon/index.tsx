import React, { memo } from 'react';
import { TextStyle, StyleProp } from 'react-native';
import { createIconSet } from 'react-native-vector-icons';
import fontJson from './config/iconfont';

// 可选扩展图标库
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// 创建自定义图标集（iconfont）
const IconFont = createIconSet(
    fontJson,
    'iconfont',
    'iconfont.ttf',
) as unknown as React.ComponentType<any>;

// 所有图标组件类型都统一：React.ComponentType
const ICON_SETS = {
    IconFont: IconFont,
    // MaterialIcons,
    // Ionicons,
    // FontAwesome,
} as const;

type IconType = keyof typeof ICON_SETS;

export interface IconProps {
    type?: IconType; // 图标库
    name: string; // 图标名
    size?: number; // 图标大小
    color?: string; // 图标颜色
    style?: StyleProp<TextStyle>; // 样式
}

const Icon = memo(({ type = 'IconFont', name, size = 24, color = '#000', style }: IconProps) => {
    const IconComponent = ICON_SETS[type];

    if (!IconComponent) {
        console.warn(`Icon type "${type}" is not supported.`);
        return null;
    }

    return (
        <IconComponent
            name={name}
            size={size}
            color={color}
            style={[
                {
                    width: size,
                    height: size,
                    lineHeight: size,
                },
                style,
            ]}
        />
    );
});

export default Icon;
