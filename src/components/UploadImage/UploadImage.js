import { UploadStates } from '@view/module/sell/config/UploadStatesConfig';
import React, { useCallback } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BORDER_RADIUS } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';
import { CardImages } from '@view/module/sell/config/images';
import { useTranslation } from 'react-i18next';
const UploadImage = ({
    width,
    data,
    uploadDispatch,
    setPreviewVisible,
    style,
    currentIndex,
    setCurrentPreviewIndex,
}) => {
    const { t } = useTranslation();
    const { filePath, status } = data;
    const { retry, remove } = uploadDispatch;

    const statusToText = useCallback(() => {
        if (status == UploadStates.FAIL) return t('retry');
        if (status == UploadStates.UPLOADING) return t('uploading');
        // if (status == UploadStates.SUCC) return 'success';

        return '';
    }, [status]);

    const handleRetryClickEvent = useCallback(() => {
        if (status !== UploadStates.FAIL) return;
        retry(data);
    }, [status, data]);

    const handleDelClickEvent = useCallback(() => {
        remove(data);
    }, [data]);

    const rightTopView = useCallback(() => {
        if (status === UploadStates.SUCC) {
            return (
                <View style={styles.rightPosition}>
                    <TouchableOpacity
                        style={styles.click}
                        onPress={() => {
                            handleDelClickEvent();
                        }}
                    >
                        <Image
                            source={CardImages.delete}
                            style={styles.rightView}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            );
        }

        if (status === UploadStates.FAIL) {
            return (
                <View style={styles.rightPosition}>
                    <TouchableOpacity
                        style={styles.click}
                        onPress={() => {
                            handleRetryClickEvent();
                        }}
                    >
                        <Image
                            source={CardImages.refresh}
                            style={styles.rightView}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            );
        }

        return null;
    }, [status, data]);

    return (
        <TouchableOpacity
            style={[
                style,
                {
                    width: width + 8,
                    height: width + 8,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    // marginTop: 10,
                },
            ]}
            onPress={() => {
                setPreviewVisible(true);
                setCurrentPreviewIndex(currentIndex);
            }}
        >
            <Image
                source={{ uri: filePath }}
                style={[{ width: width, height: width }, styles.imageView]}
            />
            {statusToText() ? (
                <View style={[styles.statusText, { width: width }]}>
                    <Text style={{ fontSize: 12, color: 'white', alignSelf: 'center' }}>
                        {statusToText()}
                    </Text>
                </View>
            ) : null}

            {rightTopView()}
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    imageView: {
        borderRadius: BORDER_RADIUS.medium,
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    statusText: {
        backgroundColor: '#00000080',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.medium,
        marginLeft: scaleSize(10),
    },
    rightView: {
        width: scaleSize(20),
        height: scaleSize(20),
    },
    rightPosition: {
        position: 'absolute',
        right: 0,
        top: -5,
    },
    click: {
        padding: scaleSize(10),
        paddingRight: scaleSize(5),
        position: 'absolute',
        right: -10,
        top: -5,
    },
});

export default UploadImage;
