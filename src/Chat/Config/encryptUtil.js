/// <reference path='../typings/node/node.d.ts' />
/**
 * Created by leo on 2015/1/14.
 */
var crypto = require('crypto');
function sh1Encrypt(content) {
    var shasum = crypto.createHash('sha1');
    shasum.update(content, 'utf8');
    return shasum.digest('base64');
}
exports.sh1Encrypt = sh1Encrypt;
function md5Encrypt(content) {
    var shasum = crypto.createHash('md5');
    shasum.update(content, 'utf8');
    return shasum.digest('base64');
}
exports.md5Encrypt = md5Encrypt;
function aesEncrypt(data, secretKey) {
    var cipher = crypto.createCipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}
exports.aesEncrypt = aesEncrypt;
;
function aesDecrypt(data, secretKey) {
    var cipher = crypto.createDecipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}
exports.aesDecrypt = aesDecrypt;
;
//# sourceMappingURL=encryptUtil.js.map