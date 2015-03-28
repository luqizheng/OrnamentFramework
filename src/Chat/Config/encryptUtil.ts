/// <reference path='../typings/node/node.d.ts' />
/**
 * Created by leo on 2015/1/14.
 */
import crypto = require('crypto');

export function sh1Encrypt(content) {
    var shasum = crypto.createHash('sha1');
    shasum.update(content, 'utf8');
    return shasum.digest('base64');
}

export function md5Encrypt(content) {
    var shasum = crypto.createHash('md5');
    shasum.update(content, 'utf8');
    return shasum.digest('base64');
}
export function aesEncrypt(data, secretKey) {
    var cipher = crypto.createCipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}; /**
 * aes解密
 * @param data
 * @param secretKey
 * @returns {*}
 */
export function aesDecrypt (data, secretKey) {
    var cipher = crypto.createDecipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
};
