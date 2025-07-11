import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import useUploadViewModel from './useUploadViewModel';
import { Toast } from '@components/Toast';

const buildUploadRequest = imgPath => {
    var filesparams = {};
    filesparams.fileName =
        new Date().getTime() + '.' + imgPath.substr(imgPath.lastIndexOf('.') + 1);
    if (Platform.OS == 'android') {
        imgPath = `file://${imgPath}`;
    }
    var file = { uri: imgPath, type: 'multipart/form-data', name: encodeURI(filesparams.fileName) };
    let formData = new FormData();
    formData.append('files', file);
    formData.append('mimeType', 'image/jpeg');
    formData.append('fileKey', 'file');
    formData.append('fileName', filesparams.fileName);
    return {
        method: ``,
        formData: formData,
        bodyParams: {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    };
};

const useAddPhoto = actionSheetRef => {
    const navigation = useNavigation();
    const { uploadInfos, uploadDispatch } = useUploadViewModel(imgPath => {
        // return buildUploadRequest(imgPath);
    });

    const selectPhotos = useCallback(() => {
        actionSheetRef?.current.showVisible();
    }, [navigation, uploadInfos]);

    const addPhoto = useCallback(() => {
        selectPhotos();
    }, [uploadInfos]);

    return {
        uploadDispatch,
        addPhoto,
        uploadInfos,
    };
};

export default useAddPhoto;
