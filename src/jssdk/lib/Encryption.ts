import SDK from '../index';
import CryptoJS from 'crypto-js';
import { RSA_PRIVATE_KEY, RSA_PUBLIC_KEY } from '../config/Constant';

const TAG = 'Encryption';

if (!RSA_PUBLIC_KEY) {
    throw new Error('RSA_PUBLIC_KEY is undefined!');
}

// 获取当前环境
const { platformType } = SDK.getBaseConfig();

// 根据当前环境选择相应的加密库
let RSA: any = null;
async function loadEncryptionLib() {
    if (platformType === 'Mobile') {
        RSA = require('react-native-fast-rsa');
        RSA.useJSI = true;
    } else if (platformType === 'Web') {
        RSA = await new Promise((resolve, reject) => {
            try {
                // 前端使用nodejs原生库
                resolve(require('node-forge'));
            } catch (error) {
                reject(error);
            }
        });
    }
}

loadEncryptionLib();

export class Encryption {
    /**
     * 执行 RSA 加密
     * @param data - 要加密的字符串数据
     * @returns Base64 编码的加密数据
     */
    public static async encryptDataWithRSA(data: string): Promise<string> {
        try {
            if (platformType === 'Web') {
                const publicKey = RSA.pki.publicKeyFromPem(RSA_PUBLIC_KEY);
                const buffer = RSA.util.createBuffer(data, 'utf8');
                const encrypted = publicKey.encrypt(buffer.getBytes(), 'RSA-OAEP', {
                    md: RSA.md.sha256.create(),
                });
                return RSA.util.encode64(encrypted);
            } else {
                const encryptedData = await RSA.default.encryptOAEP(
                    data,
                    '',
                    RSA.Hash.SHA256,
                    RSA_PUBLIC_KEY,
                );
                const cleanedEncryptedData = encryptedData.replace(/\r?\n/g, '');
                return cleanedEncryptedData;
            }
        } catch (error) {
            console.log(TAG, '[encryptDataWithRSA]', error);
            throw error;
        }
    }

    /**
     * 执行 RSA 解密
     * @param encryptedData - 已加密的 Base64 字符串
     * @returns 解密后的字符串
     */
    public static async decryptDataWithRSA(encryptedData: string): Promise<string> {
        try {
            if (platformType === 'Web') {
                const privateKey = RSA.pki.privateKeyFromPem(RSA_PRIVATE_KEY);
                const encrypted = RSA.util.decode64(encryptedData);
                const decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
                    md: RSA.md.sha256.create(),
                });
                return decrypted;
            } else {
                return await RSA.default.decryptOAEP(
                    encryptedData,
                    '',
                    RSA.Hash.SHA256,
                    RSA_PRIVATE_KEY,
                );
            }
        } catch (error) {
            console.error(TAG, '[decryptDataWithRSA]', error);
            throw error;
        }
    }

    /**
     * 执行 AES 对称加密
     * @param data - 要加密的JSON数据
     * @returns AES 密钥和加密数据
     */
    public static async encryptDataWithAES(data: any): Promise<any> {
        let aesKey = '',
            encryptAesKey = '',
            encryptData = '';
        try {
            aesKey = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64); // 32 字节 (256-bit) 随机密钥
            encryptAesKey = await this.encryptDataWithRSA(aesKey); // 用 RSA 加密 AES 密钥
            if (data) {
                encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), aesKey).toString(); // AES 加密数据，加密前需要将数据转成字符串
            }
        } catch (error) {
            console.error(TAG, JSON.stringify(error));
        }

        return {
            aesKey, // 原始 AES 密钥（Hex 编码）
            encryptAesKey, // RSA 加密的 AES 密钥（Base64 编码）
            encryptData, // AES 加密后的数据（Base64 编码）
        };
    }

    /**
     * 执行 AES 对称解密
     * @param encryptedData - AES 加密的 Base64 数据
     * @param key - AES 密钥（Hex 编码）
     * @returns 解密后的字符串
     */
    public static decryptDataWithAES(encryptedData: string, key: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
