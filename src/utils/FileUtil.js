import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import SparkMD5 from 'spark-md5';
import RNBlobUtil from 'react-native-blob-util';

/**
 * 获得文件信息
 * @param {*} path
 * @param {*} mimeType
 * @returns
 */
export const getFileInfo = async (path, mimeType) => {
    const fileName = getFileName(path);
    const base64Str = await RNBlobUtil.fs.readFile(path, 'base64');
    const buffer = Buffer.from(base64Str, 'base64');
    const arrayBuffer = buffer.buffer; // 转换为 ArrayBuffer
    const md5 = SparkMD5.ArrayBuffer.hash(arrayBuffer);
    return {
        fileArrayBuffer: arrayBuffer,
        md5,
        filePath: path,
        contentType: mimeType,
        fileName,
    };
};

/*
 * 获得文件名称
 * @param {*} filePath
 * @returns
 */
export const getFileName = filePath => {
    return filePath.split('/').pop();
};

/**
 * 获取文件扩展名
 * @param filename
 * @returns
 */
export const getMimeType = filename => {
    // 使用正则表达式精确获取文件扩展名
    const match = filename.match(/\.([^.]+)$/);
    const ext = match ? match[1].toLowerCase() : '';

    const mimeTypes = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
        bmp: 'image/bmp',
        tiff: 'image/tiff',
        mp4: 'video/mp4',
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        txt: 'text/plain',
        csv: 'text/csv',
        json: 'application/json',
        xml: 'application/xml',
    };

    return mimeTypes[ext] || 'application/octet-stream';
};
