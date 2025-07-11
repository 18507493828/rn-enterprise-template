import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ActionSheet, { ScrollView } from 'react-native-actions-sheet';
import { Icon, TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import {
    BORDER_RADIUS,
    COLORS,
    DEFAULT_BOTTOM_SPACE,
    DEFAULT_CONTAINER_SPACE,
    FONT_SIZES,
    FONT_WEIGHTS,
} from '@common/CommonStyle';

const SelectableTextBox = forwardRef(
    (
        {
            label,
            title,
            icon,
            placeholder,
            selectedValue,
            children,
            source,
            url,
            actionSheetStyle,
            labelStyle,
            iconStyle,
            imageStyle,
            scrollViewStyle,
            onClose, // 新增 onClose 回调
            disabled = false, // 新增 disabled 属性
            containerHeight = scaleSize(40), // 容器高度
            bottomView = () => {},
            placeholderView = () => {},
        },
        ref,
    ) => {
        const actionSheetRef = useRef();

        const openActionSheet = () => {
            if (disabled) return; // 如果禁用，则不执行打开操作
            actionSheetRef.current?.show();
        };

        const closeActionSheet = () => {
            actionSheetRef.current?.hide();
        };

        // 暴露给父组件的方法
        useImperativeHandle(ref, () => ({
            openActionSheet,
            closeActionSheet,
        }));
        const displayText = selectedValue || placeholder;

        return (
            <View>
                {/* 标签 */}
                {label && <TextInner style={[styles.label, labelStyle]}>{label}</TextInner>}

                {/* 点击区域 */}
                <TouchableOpacity
                    style={[
                        styles.textBoxContainer,
                        { height: containerHeight },
                        disabled && styles.disabledContainer,
                    ]} // 禁用时改变容器样式
                    onPress={openActionSheet}
                    activeOpacity={disabled ? 1 : 0.8} // 禁用时不响应点击
                    disabled={disabled} // 禁用时 TouchableOpacity 不响应点击
                >
                    {icon && (
                        <Icon
                            name={icon}
                            size={24}
                            color={disabled ? '#D3D3D3' : '#000'} // 禁用时图标变灰
                            style={[styles.icon, iconStyle]}
                        />
                    )}
                    {source && <Image source={source} style={imageStyle} />}
                    {url && <Image source={{ uri: url }} style={imageStyle} />}
                    {displayText && (
                        <TextInner
                            style={[
                                styles.text,
                                !selectedValue && styles.placeholderText,
                                disabled && styles.disabledText, // 禁用时文字变灰
                            ]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {displayText}
                        </TextInner>
                    )}
                    {!selectedValue && placeholderView()}
                    <Icon
                        name="drop-down"
                        size={24}
                        color={disabled ? '#D3D3D3' : '#000'} // 禁用时箭头图标变灰
                        style={[styles.dropDownIcon, iconStyle]}
                    />
                </TouchableOpacity>

                {/* ActionSheet */}
                <ActionSheet
                    ref={actionSheetRef}
                    extraScroll={1}
                    initialOffsetFromBottom={true}
                    gestureEnabled
                    onClose={onClose} // 添加 onClose 回调
                    containerStyle={[styles.actionSheetContainer, actionSheetStyle]}
                >
                    <View style={styles.actionSheetContent}>
                        {title && <TextInner style={styles.titleText}>{title}</TextInner>}
                        <ScrollView style={[styles.scrollView, scrollViewStyle]}>
                            <View style={styles.contentView}>
                                {React.Children.map(children, child =>
                                    React.cloneElement(child, {
                                        onPress: (...args) => {
                                            if (disabled) return; // 如果禁用，则不响应点击
                                            child.props.onPress?.(...args); // 调用原始点击事件
                                            closeActionSheet(); // 自动关闭
                                        },
                                    }),
                                )}
                            </View>
                        </ScrollView>
                        {bottomView()}
                    </View>
                </ActionSheet>
            </View>
        );
    },
);

const styles = StyleSheet.create({
    label: {
        fontSize: FONT_SIZES.small,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: scaleSize(10),
        color: '#333',
    },
    textBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleSize(12),
        borderWidth: 1,
        borderColor: COLORS.lineColor,
        borderRadius: BORDER_RADIUS.medium,
        backgroundColor: '#fff',
    },
    disabledContainer: {
        backgroundColor: COLORS.disableBackColor, // 禁用时背景颜色变灰
        borderColor: COLORS.disableBorderColor, // 禁用时边框颜色变灰
    },
    titleText: {
        alignSelf: 'center',
        marginBottom: scaleSize(14),
        fontSize: FONT_SIZES.small,
        fontWeight: FONT_WEIGHTS.bold,
    },
    placeholderText: {
        color: '#C7C7C9',
    },
    icon: {
        marginRight: scaleSize(10),
    },
    dropDownIcon: {
        marginLeft: scaleSize(10),
    },
    text: {
        flex: 1, // 确保输入框宽度自动填满容器
        fontSize: FONT_SIZES.xSmall,
        paddingVertical: scaleSize(0),
        color: '#333333',
    },
    disabledText: {
        color: '#D3D3D3', // 禁用时文字变灰
    },
    actionSheetContainer: {
        maxHeight: '100%',
        height: '50%',
    },
    actionSheetContent: {
        height: '100%',
        // paddingVertical: scaleSize(6),
    },
    scrollView: {
        flexShrink: 1,
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
    contentView: {
        marginBottom: DEFAULT_BOTTOM_SPACE,
    },
});

export default SelectableTextBox;
