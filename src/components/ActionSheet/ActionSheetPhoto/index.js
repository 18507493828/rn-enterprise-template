import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { ClickableItem, TextInner, Toast } from '@components/index';
import { BORDER_RADIUS, DEFAULT_CONTAINER_SPACE, FONT_SIZES } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';
import ImagePicker from 'react-native-image-crop-picker';
import { getFileInfo } from '@utils/FileUtil';
import { useTranslation } from 'react-i18next';

// mediaType: 'video' || 'photo';

const ActionSheetPhoto = (
    {
        isMultiple = false,
        style = {},
        onImagesChange = () => {},
        maxImages = 10,
        mediaType = 'photo',
    },
    ref,
) => {
    const { t } = useTranslation();
    const actionSheetRef = useRef();
    const [images, setImages] = useState([]);
    const [imagesUrl, setImagesUrl] = useState([]);

    // 请求权限的方法
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: t('image_permission_camera'),
                    message: '',
                    buttonNeutral: t('ask_me_again_later'),
                    buttonNegative: t('no'),
                    buttonPositive: t('ok'),
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            } else {
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useImperativeHandle(ref, () => ({
        showVisible: () => {
            actionSheetRef?.current.show();
        },

        //删除图片
        deleteImage: index => {
            const updatedImages = images.filter((_, i) => i !== index);
            setImages([...updatedImages]);
            const updatedImageUrls = imagesUrl.filter((_, i) => i !== index);
            setImagesUrl([...updatedImageUrls]);
        },
    }));

    //多选
    const updateImages = async (newImages, name) => {
        let urlArr = [];
        let ImagesObjArr = [];
        let selectImagesObjArr = [];
        let updatedImages = [];
        let updatedImagesUrl = [];
        if (isMultiple) {
            //多选
            if (name == 'camera') {
                urlArr = [newImages?.path];
                ImagesObjArr = [newImages];
                selectImagesObjArr = await Promise.all(
                    [newImages].map(async item => {
                        const fileInfo = await getFileInfo(item.path, item.mime);
                        return fileInfo;
                    }),
                );
            } else if (name == 'photo') {
                urlArr = newImages.map(v => v.path);
                ImagesObjArr = newImages;
                selectImagesObjArr = await Promise.all(
                    newImages.map(async item => {
                        const fileInfo = await getFileInfo(item.path, item.mime);
                        return fileInfo;
                    }),
                );
            }
            updatedImagesUrl = [...imagesUrl, ...urlArr].slice(0, maxImages);
            updatedImages = [...images, ...ImagesObjArr].slice(0, maxImages);
        } else {
            //单选
            const imageWithInfo = await (async () => {
                const fileInfo = await getFileInfo(newImages.path, newImages.mime);
                return fileInfo;
            })();
            selectImagesObjArr = [imageWithInfo];
            updatedImagesUrl = [newImages.path];
            updatedImages = [newImages];
        }
        const imageObj = {
            selectImages: selectImagesObjArr,
            images: updatedImages,
            urls: updatedImagesUrl,
        };
        setImagesUrl(updatedImagesUrl);
        setImages(updatedImages);
        onImagesChange && onImagesChange(imageObj);
    };

    const handleOptionPress = async name => {
        actionSheetRef?.current.hide();
        const event = {
            camera: ImagePicker.openCamera,
            photo: ImagePicker.openPicker,
        };
        setTimeout(async () => {
            await event[name]({
                width: scaleSize(300),
                height: scaleSize(400),
                cropping: false,
                maxFiles: 20,
                multiple: isMultiple,
                compressImageQuality: 0.2,
                mediaType,
            })
                .then(result => {
                    updateImages(result, name);
                })
                .catch(err => {
                    err.code != 'E_PICKER_CANCELLED' && Toast.warning(err.message);
                    err.code != 'E_PICKER_CANCELLED' &&
                        Platform.OS == 'android' &&
                        requestCameraPermission();
                });
        }, 300);
    };

    return (
        <View style={[styles.container, style]}>
            {/*  */}
            <ActionSheet ref={actionSheetRef} gestureEnabled>
                <View style={styles.actionSheetContent}>
                    <TextInner style={styles.titleText}>{t('image_upload_photo')}</TextInner>
                    <ClickableItem
                        hitSlop={0}
                        icon="photo-library"
                        text={t('image_ppload_gallery')}
                        iconSize={24}
                        iconColor="#000"
                        textStyle={styles.itemText}
                        style={styles.actionSheetItem}
                        onPress={() => handleOptionPress('photo')}
                    />
                    <ClickableItem
                        hitSlop={0}
                        icon="camera"
                        text={t('image_capture_camera')}
                        iconSize={24}
                        iconColor="#000"
                        textStyle={styles.itemText}
                        style={styles.actionSheetItem}
                        onPress={() => handleOptionPress('camera')}
                    />
                </View>
            </ActionSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: scaleSize(34),
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // 默认左对齐
    },
    clickableItemContainer: {
        backgroundColor: '#F1F1F1',
        borderRadius: BORDER_RADIUS.medium,
        width: scaleSize(90),
        height: scaleSize(90),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleSize(10),
        marginRight: scaleSize(10),
    },
    imageWrapper: {
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 12,
        padding: 5,
    },
    clickableItemText: {
        marginTop: scaleSize(7),
        fontSize: FONT_SIZES.xSmall,
        color: '#565656',
    },
    actionSheetContent: {
        paddingVertical: scaleSize(5),
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
        marginBottom: scaleSize(15),
    },
    titleText: {
        alignSelf: 'center',
        marginBottom: scaleSize(24),
        fontSize: FONT_SIZES.small,
        fontWeight: 'bold',
    },
    actionSheetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scaleSize(15),
    },
    itemText: {
        fontSize: FONT_SIZES.small,
        marginLeft: scaleSize(10),
    },
});

export default forwardRef(ActionSheetPhoto);
