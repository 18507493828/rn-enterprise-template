import API from '../../config/API';
import BaseService, { ApiResponse } from './BaseService';
import { RequestMethod } from '../../lib/Types';

const TAG = 'FileService';
class FileService extends BaseService {
    /**
     * 获得签名地址
     * @param files
     */
    public static async getSignatureUrls(files: any, type?: string): Promise<any> {
        return await this.request(RequestMethod.POST, API.BATCH_GET_SIGNATURE_URLS, {
            data: { files, type },
        });
    }

    /**
     * 文件上传至存储桶
     * @param options
     * @returns
     */
    public static async uploadFileToBucket(
        url: string,
        token: string,
        fileInfo: UploadFileToBucketEntity,
    ): Promise<any> {
        return await this.request(RequestMethod.PUT, url, {
            headers: {
                Authorization: token,
                'Content-MD5': fileInfo.md5,
                'Content-Type': fileInfo.contentType || 'application/octet-stream',
                'Content-Length': fileInfo.fileArrayBuffer.byteLength, // 文件大小
            },
            data: fileInfo.fileArrayBuffer,
            timeout: 30000,
        });
    }

    /**
     * 从存储桶中删除文件
     * @param options
     * @returns
     */
    public static async deleteFileFromBucket(options: SignatureEntity): Promise<any> {
        this.validateRequiredFields(`${TAG}-deleteFileFromBucket`, ['url', 'token'], options);
        return await this.request(RequestMethod.DELETE, options.url, {
            headers: {
                Authorization: options.token,
            },
        });
    }
}

export default FileService;
