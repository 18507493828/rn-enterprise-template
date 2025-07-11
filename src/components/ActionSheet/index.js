import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import ActionSheet, { ScrollView } from 'react-native-actions-sheet';
import { Icon, TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import {
    DEFAULT_BOTTOM_SPACE,
    DEFAULT_CONTAINER_SPACE,
    FONT_SIZES,
    FONT_WEIGHTS,
} from '@common/CommonStyle';

const CustomActionSheet = forwardRef(
    (
        {
            useComponent,
            title,
            children,
            onClose, // 新增 onClose 回调
            disabled = false, // 新增 disabled 属性
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

        return (
            <View>
                {useComponent}

                {/* ActionSheet */}
                <ActionSheet
                    ref={actionSheetRef}
                    extraScroll={1}
                    initialOffsetFromBottom={true}
                    gestureEnabled
                    onClose={onClose} // 添加 onClose 回调
                    containerStyle={styles.actionSheetContainer}
                >
                    <View style={styles.actionSheetContent}>
                        {title && <TextInner style={styles.titleText}>{title}</TextInner>}
                        <ScrollView style={styles.scrollView}>
                            {React.Children.map(children, child =>
                                React.cloneElement(child, {
                                    onPress: (...args) => {
                                        if (disabled) return; // 如果禁用，则不响应点击
                                        child.props.onPress?.(...args); // 调用原始点击事件
                                        closeActionSheet(); // 自动关闭
                                    },
                                }),
                            )}
                        </ScrollView>
                    </View>
                </ActionSheet>
            </View>
        );
    },
);

const styles = StyleSheet.create({
    actionSheetContainer: {
        maxHeight: '100%',
        height: '50%',
    },
    actionSheetContent: {
        height: '100%',
        paddingVertical: scaleSize(5),
        paddingBottom: DEFAULT_BOTTOM_SPACE,
    },
    scrollView: {
        flexShrink: 1,
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },

    titleText: {
        alignSelf: 'center',
        marginBottom: scaleSize(24),
        fontSize: FONT_SIZES.small,
        fontWeight: FONT_WEIGHTS.bold,
    },
});

export default CustomActionSheet;
