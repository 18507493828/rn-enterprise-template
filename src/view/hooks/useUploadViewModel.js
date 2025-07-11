import { useRef, useEffect, useState, useCallback } from 'react';
import { UploadStates } from '@view/module/sell/config/UploadStatesConfig';
import CommonController from '@business/controller/CommonController';
import { FileService } from '@jssdk/model/service';

const useUploadViewModel = (getRequestArgs, uploadedInfos, type = '') => {
    const [uploadInfos, setUploadInfos] = useState([]);
    const uploadInfosRef = useRef([]);
    uploadInfosRef.current = uploadInfos;
    const [imgPaths, setImgPaths] = useState([]);

    useEffect(() => {
        if (imgPaths.length == 0) return;
        const willUploadInfos = [];
        imgPaths.forEach(imgPath => {
            imgPath.status = UploadStates.UPLOADING;
            willUploadInfos.push(imgPath);
        });
        const mergedUploadInfos = [...willUploadInfos, ...uploadInfosRef.current];
        setUploadInfos(mergedUploadInfos);
        batchUpload(willUploadInfos);
    }, [imgPaths]);

    const batchUpload = async willUploadInfos => {
        for (let item of willUploadInfos) {
            const rsp = await CommonController.uploadFiles([item], item.type);
            let imageObj = rsp[0];
            // let imageObj = rsp;
            if (imageObj && imageObj.url) {
                item = {
                    ...item,
                    url: imageObj.url,
                    token: imageObj.delete_token,
                    status: UploadStates.SUCC,
                };
            } else {
                item = { ...item, status: UploadStates.FAIL };
            }

            const latestUploadInfos = [...uploadInfosRef.current];
            for (const [idx, uploadInfo] of latestUploadInfos.entries()) {
                if (item.filePath == uploadInfo.filePath) {
                    latestUploadInfos[idx] = item;
                    break;
                }
            }
            setUploadInfos(latestUploadInfos);
        }
    };

    const retry = useCallback(failedUploadInfo => {
        failedUploadInfo.status = UploadStates.UPLOADING;
        const _uploadInfos = [...uploadInfosRef.current];
        setUploadInfos(_uploadInfos);
        batchUpload([failedUploadInfo]);
    }, []);

    const remove = useCallback(async uploadInfo => {
        var deleteObj = { url: uploadInfo.url, token: uploadInfo.token };
        await FileService.deleteFileFromBucket(deleteObj);
        const _uploadInfos = [...uploadInfosRef.current];
        var index = _uploadInfos.indexOf(uploadInfo);
        if (index > -1) {
            //if found
            _uploadInfos.splice(index, 1);
        }
        setUploadInfos(_uploadInfos);
    }, []);

    const mergeUploadInfos = useCallback(
        _uploadInfos => {
            setUploadInfos([...uploadInfos, ..._uploadInfos]);
        },
        [uploadInfos],
    );

    return {
        uploadDispatch: { retry, remove, upload: setImgPaths, mergeUploadInfos },
        uploadInfos,
    };
};

export default useUploadViewModel;
