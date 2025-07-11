import React, { useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import SparkMD5 from 'spark-md5';

import MD5 from 'crypto-js/md5';
import { calculateMD5 } from '@utils/FileUtil';
import axios from 'axios';

const DownloadAndCalculateMD5 = () => {
    const [loading, setLoading] = useState(false);
    const [md5, setMd5] = useState('');
    const [error, setError] = useState('');

    const downloadImageAndCalculateMD5 = async imageUrl => {
        try {
            setLoading(true);

            // 步骤 1: 下载图片到临时文件
            console.log('Starting download...');
            const res = await RNBlobUtil.config({
                fileCache: true,
            }).fetch('GET', imageUrl);

            console.log('请求图片 URL:', imageUrl);

            // const res = await axios.get(imageUrl, {
            //     responseType: 'arraybuffer',
            //     headers: {
            //         Accept: 'image/*',
            //     },
            // });

            // console.log('Download complete, path:', res.path());

            // 步骤 2: 读取文件内容为 base64
            const fileData = await RNBlobUtil.fs.readFile(res.path(), 'base64');
            console.log('File read as base64');

            // 步骤 3: 计算 MD5
            const buffer = Buffer.from(fileData, 'base64');
            // const wordArray = CryptoJS.lib.WordArray.create(buffer);
            // const calculatedMD5 = CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Hex);

            // const blob = RNBlobUtil.polyfill.Blob.build([new Uint8Array(buffer)], {
            //     type: fileMimeType,
            // });

            const arrayBuffer = buffer.buffer; // 转换为 ArrayBuffer
            const calculatedMD5 = SparkMD5.ArrayBuffer.hash(arrayBuffer);
            setMd5(calculatedMD5);

            // 显示 MD5 值
            Alert.alert('MD5 计算完成', `MD5: ${calculatedMD5}`);
        } catch (error) {
            console.error('Error downloading or calculating MD5:', error);
            setError('下载或计算 MD5 时发生错误');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Button
                title={loading ? '下载中...' : '下载图片并计算 MD5'}
                onPress={() =>
                    downloadImageAndCalculateMD5(
                        'https://v2-app-backend.afr-nigeria.ufileos.com/1737705089000_fc7xenerzfg.png',
                    )
                }
                disabled={loading}
            />
            {md5 && <Text style={{ marginTop: 20 }}>MD5: {md5}</Text>}
            {error && <Text style={{ marginTop: 20, color: 'red' }}>{error}</Text>}
        </View>
    );
};

export default DownloadAndCalculateMD5;
