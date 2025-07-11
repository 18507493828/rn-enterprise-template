import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardTypeOptions,
    TextStyle,
    ViewStyle,
    ImageStyle,
} from 'react-native';
import { TextInner, Icon } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import { BORDER_RADIUS, COLORS, FONT_SIZES } from '@common/CommonStyle';
import { prohibit } from '@utils/RegularUtil';

type Style = TextStyle | ViewStyle | ImageStyle;

interface Props {
    autoFocus?: boolean;
    marginTop?: number;
    marginBottom?: number;
    keyboardType?: KeyboardTypeOptions;
    isBorderWidth?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    leftChirdren?: ReactNode;
    RightChirdren?: ReactNode;
    label?: string;
    value?: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    iconName?: string;
    iconSize?: number;
    maxLength?: number;
    iconColor?: string;
    onIconPress?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    mark?: string;
    containerStyle?: Style;
    inputStyle?: Style;
    labelStyle?: Style;
    iconStyle?: Style;
    showClearButton?: boolean;
    inputWrapperStyle?: Style;
    markStyle?: Style;
    editable?: boolean;
    isProhibitCN?: boolean;
    error?: string;
    hint?: string;
    isSpecialCharacters?: boolean;
    containerHeight?: number;
}

const InputField = ({
    autoFocus = false,
    onFocus,
    onBlur,
    marginTop = scaleSize(20), //离上面距离 默认20
    marginBottom = scaleSize(0), //离下面距离 默认0
    isBorderWidth = true, //是否显示边框
    multiline = false, //是否多行
    numberOfLines = 1, //多少行
    leftChirdren, //框内左边自定义内容
    RightChirdren, //框内右边自定义内容
    label, // 输入框的标签文本
    placeholder, // 输入框的占位文本
    value, // 输入框的当前值
    onChangeText, // 输入框文本变化时的回调函数
    secureTextEntry, // 是否为密码输入模式
    keyboardType = 'default', // 输入框的键盘类型，默认 'default'
    iconName, // 左侧图标的名称
    iconSize = 24, // 左侧图标的大小，默认 24
    iconColor = '#000', // 左侧图标的颜色，默认黑色
    onIconPress, // 左侧图标的点击回调函数
    mark, // 左侧文本标记
    containerStyle, // 外层容器的自定义样式
    inputStyle, // 输入框的自定义样式
    labelStyle, // 标签文本的自定义样式
    iconStyle, // 左侧图标的自定义样式
    showClearButton = true, // 是否显示清除按钮，默认显示
    inputWrapperStyle = {}, // 输入框容器样式
    markStyle = {}, // 左侧文本标记样式
    editable = true, //是否可以输入
    error, //输入错误提示
    hint, //其他提示
    isProhibitCN = true, //是否禁用中文，默认禁止输入
    maxLength = 30, //最大长度
    isSpecialCharacters = true, //是否禁用特殊字符
    containerHeight = scaleSize(40), // 容器高度
    ...otherProps
}: Props) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);
    const inputRef = useRef<any>();

    // 清除输入框文本内容
    const handleClearText = () => {
        // setTextValue('');
        onChangeText('');
    };

    useEffect(() => {
        //需要自动弹出键盘时用到，解决iOS深色模式由黑变浅的问题
        if (autoFocus) {
            const timer = setTimeout(() => {
                if (inputRef.current) {
                    autoFocus && inputRef?.current?.focus(); // 延迟聚焦
                }
            }, 500); // 0.5秒后自动聚焦
            return () => clearTimeout(timer); // 组件卸载时清理定时器
        }
    }, []);

    return (
        //KeyboardAvoidingView 在RN 0.76.5目前版本有问题，后续考虑用KeyboardAvoidingView
        // <KeyboardAvoidingView
        <View
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { marginTop, marginBottom }, containerStyle]}
        >
            {/* 标签 */}
            {label && <TextInner style={[styles.label, labelStyle]}>{label}</TextInner>}

            {/* 输入框容器 */}
            <View
                style={[
                    styles.inputWrapper,
                    inputWrapperStyle,
                    {
                        borderWidth: isBorderWidth ? 1 : 0,
                        borderColor: COLORS.lineColor,
                    },
                ]}
            >
                {leftChirdren && leftChirdren}
                {/* 左侧图标 */}
                {iconName && (
                    <TouchableOpacity
                        onPress={onIconPress}
                        style={[styles.iconContainer, iconStyle]}
                    >
                        <Icon name={iconName} size={iconSize} color={iconColor} />
                    </TouchableOpacity>
                )}

                {mark && <TextInner style={[styles.mark, markStyle]}>{mark}</TextInner>}

                {/* 输入框 */}
                <TextInput
                    ref={inputRef}
                    // scrollEnabled={false}
                    maxLength={maxLength}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    style={[styles.input, { height: containerHeight }, inputStyle]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={text => {
                        if (!isProhibitCN || !prohibit(text)) {
                            onChangeText(text);
                        }
                    }}
                    autoComplete={'off'}
                    onFocus={() => {
                        onFocus && onFocus();
                    }}
                    onBlur={e => {
                        const value = e.nativeEvent.text;
                        if (value) {
                            onChangeText(value.trim()); // 失去焦点时去除前后空格
                        }
                        onBlur && onBlur();
                    }}
                    placeholderTextColor={COLORS.placeholderTextColor}
                    secureTextEntry={isSecure}
                    keyboardType={keyboardType}
                    editable={editable}
                    returnKeyType="done"
                    scrollEnabled={false} // 避免滚动冲突
                    {...otherProps}
                />

                {/* 密码显示/隐藏切换图标 */}
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setIsSecure(!isSecure)}
                        style={styles.toggleIcon}
                    >
                        <Icon name={isSecure ? 'hide' : 'show'} size={20} color="#888" />
                    </TouchableOpacity>
                )}

                {/* 清除按钮 */}
                {showClearButton && value && (
                    <TouchableOpacity onPress={handleClearText} style={styles.clearIcon}>
                        {/* <TextInner style={{ fontSize: 10 }}>34345</TextInner> */}

                        <Icon name="close1" size={scaleSize(16)} color="#888" />
                    </TouchableOpacity>
                )}
                {RightChirdren && RightChirdren}
            </View>
            {error && <TextInner style={styles.errorText}>{error}</TextInner>}
            {hint && <TextInner style={styles.hintText}>{hint}</TextInner>}
        </View>
    );
};

// InputField.propTypes = {
//     label: PropTypes.string,
//     placeholder: PropTypes.string,
//     value: PropTypes.string,
//     onChangeText: PropTypes.func,
//     secureTextEntry: PropTypes.bool,
//     keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad']),
//     iconName: PropTypes.string,
//     iconSize: PropTypes.number,
//     iconColor: PropTypes.string,
//     onIconPress: PropTypes.func,
//     containerStyle: PropTypes.object,
//     inputStyle: PropTypes.object,
//     labelStyle: PropTypes.object,
//     iconStyle: PropTypes.object,
//     showClearButton: PropTypes.bool,
// };

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: FONT_SIZES.xxSmall,
        marginTop: scaleSize(5),
        marginHorizontal: scaleSize(5),
    },
    hintText: {
        color: 'green',
        fontSize: FONT_SIZES.xxSmall,
        marginTop: scaleSize(5),
        marginHorizontal: scaleSize(5),
    },
    container: {
        // flex: 1,
        // marginVertical: scaleSize(10),
    },
    label: {
        fontSize: FONT_SIZES.small,
        fontWeight: 'bold',
        marginBottom: scaleSize(10),
        color: '#333',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: BORDER_RADIUS.medium,
        paddingHorizontal: scaleSize(12),
        backgroundColor: '#fff',
        // 确保宽度适应父容器
        width: '100%',
    },
    mark: {
        fontSize: FONT_SIZES.xxLarge,
        fontWeight: 'bold',
        marginRight: scaleSize(10),
    },
    input: {
        flex: 1, // 确保输入框宽度自动填满容器
        fontSize: FONT_SIZES.xSmall,
        paddingVertical: scaleSize(0),
        color: '#333',
    },
    iconContainer: {
        marginRight: scaleSize(10),
    },
    toggleIcon: {
        marginLeft: scaleSize(10),
    },
    clearIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green',
        marginLeft: scaleSize(10),
    },
});

export default InputField;
