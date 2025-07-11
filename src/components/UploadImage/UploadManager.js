import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { scaleSize, SCREEN_WIDTH } from '@utils/ScreenUtil';
import UploadImage from './UploadImage';
import { BORDER_RADIUS } from '@common/CommonStyle';
import ActionSheet, { ScrollView } from 'react-native-actions-sheet';
import ImagePreView from '@view/module/sell/core/ImagePreView';

const UploadMgr = forwardRef(
    (
        {
            data,
            uploadDispatch,
            setPreviewVisible,
            setCurrentPreviewIndex,
            currentPreviewIndex,
            isPreviewVisible,
            imageUrl,
        },
        ref,
    ) => {
        const actionSheetRef = React.useRef(null);
        let imgWH = (SCREEN_WIDTH - 20) / 3;
        let imgW = imgWH - 45;
        // 显示上传管理器
        const show = useCallback(() => {
            actionSheetRef.current?.show();
        }, []);

        // 隐藏上传管理器
        const hide = useCallback(() => {
            actionSheetRef.current?.hide();
        }, []);

        // 暴露给父组件的方法
        useImperativeHandle(ref, () => ({
            show,
            hide,
        }));

        return (
            <ActionSheet
                ref={actionSheetRef}
                extraScroll={1}
                initialOffsetFromBottom={true}
                containerStyle={styles.actionSheetContainer}
                gestureEnabled
            >
                {/* 图片预览弹窗 */}
                <ImagePreView
                    imageUrl={imageUrl}
                    isPreviewVisible={isPreviewVisible}
                    setPreviewVisible={setPreviewVisible}
                    currentPreviewIndex={currentPreviewIndex}
                    setCurrentPreviewIndex={setCurrentPreviewIndex}
                />
                <View style={styles.actionSheetContent}>
                    <ScrollView>
                        <View style={styles.imageView}>
                            {data.map((item, index) => (
                                <UploadImage
                                    key={item.filePath + index}
                                    style={{
                                        width: imgW,
                                        height: imgW,
                                        borderRadius: BORDER_RADIUS.medium,
                                        marginTop: 5,
                                        paddingLeft: 10,
                                    }}
                                    width={imgW}
                                    uploadDispatch={uploadDispatch}
                                    data={item}
                                    setPreviewVisible={setPreviewVisible}
                                    setCurrentPreviewIndex={setCurrentPreviewIndex}
                                    currentIndex={index}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </ActionSheet>
        );
    },
);

const styles = StyleSheet.create({
    imageView: {
        flexDirection: 'row',
        margin: scaleSize(10),
        flexWrap: 'wrap',
    },
    actionSheetContainer: {
        maxHeight: '100%',
        height: '50%',
    },
    actionSheetContent: {
        height: '100%',
    },
});

export default UploadMgr;
