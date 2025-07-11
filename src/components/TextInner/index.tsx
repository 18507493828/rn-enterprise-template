import { fromCharCode } from '@components/Icon/config/iconfont';
import { scaleSize } from '@utils/ScreenUtil';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import Animated from 'react-native-reanimated';

type TextInnerProps = TextProps & {
    children?: React.ReactNode;
    style?: TextStyle | TextStyle[];
    dynamicContent?: string; // 动态内容
    isVisible?: boolean;
    useAnimated?: boolean;
    useIconFont?: boolean;
    iconName?: string; // 字体库名称
};

// 默认样式
const defaultStyles: TextStyle = {
    fontSize: scaleSize(14),
    color: '#333',
    fontFamily: 'Arial', // 根据项目需求设置默认字体
};

// 封装的 AppText 组件，支持动态更新文本内容
const TextInner: React.FC<TextInnerProps> = ({
    children,
    style = {},
    dynamicContent,
    isVisible = true,
    useAnimated = false,
    useIconFont = false,
    iconName = '',
    ...props
}) => {
    const [content, setContent] = useState<string | React.ReactNode>(children || dynamicContent);

    // 监听 dynamicContent 或 children 的变化，动态更新 content
    useEffect(() => {
        if (dynamicContent !== undefined) {
            setContent(dynamicContent);
        } else if (children !== undefined) {
            setContent(children);
        }
    }, [dynamicContent, children]); // 每当 dynamicContent 或 children 发生变化时更新 content

    // 支持动画
    const NewText = useAnimated ? Animated.Text : Text;

    // 支持解析iconFont字体库，对Unicode(16进制) 字节进行解码
    let inner = '',
        iconStyle = {};
    if (useIconFont) {
        inner = fromCharCode(iconName);
        iconStyle = styles.icon;
    }

    return isVisible ? (
        <NewText style={[defaultStyles, style, iconStyle]} {...props}>
            {inner || content}
        </NewText>
    ) : null;
};

const styles = StyleSheet.create({
    icon: {
        fontFamily: 'iconfont',
        lineHeight: 30,
    },
});

export default TextInner;
