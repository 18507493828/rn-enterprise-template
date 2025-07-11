import { scaleSize } from '@utils/ScreenUtil';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { useUserState } from '@lib/zustand';

type TextInnerProps = TextProps & {
    children?: React.ReactNode;
    style?: TextStyle | TextStyle;
    isUnit?: boolean;
    dynamicContent?: string; // 动态内容
};

// 默认样式
const defaultStyles: TextStyle = {
    fontSize: scaleSize(14),
    color: '#333',
    fontFamily: 'Arial', // 根据项目需求设置默认字体
};

// 封装的 AppText 组件，支持动态更新文本内容
const TextWithUnit: React.FC<TextInnerProps> = ({
    children,
    style = {},
    dynamicContent,
    isUnit = true,
    ...props
}) => {
    const { currency } = useUserState();
    const [content, setContent] = useState<string | React.ReactNode>(children || dynamicContent);
    // console.log('textInner==', Unit);
    // 监听 dynamicContent 或 children 的变化，动态更新 content
    useEffect(() => {
        if (dynamicContent !== undefined) {
            setContent(dynamicContent);
        } else if (children !== undefined) {
            setContent(children);
        }
    }, [dynamicContent, children]); // 每当 dynamicContent 或 children 发生变化时更新 content

    return (
        <Text style={[defaultStyles, style]} {...props}>
            {`${isUnit ? currency : ''}`}
            {content}
        </Text>
    );
};

export default TextWithUnit;
