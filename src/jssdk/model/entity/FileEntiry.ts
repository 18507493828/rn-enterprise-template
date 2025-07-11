interface UploadFileToBucketEntity {
    fileArrayBuffer: any; // ArrayBuffer 二进制文件
    contentType: string; // 文件类型
    md5: string; // 文件md5
}

interface SignatureEntity {
    url: string; // 存储桶文件地址
    token: string; // 存储桶token
}
