/**
 * Created by leo on 2015/1/14.
 */
var crypto = require('crypto');

exports.sh1Encrypt = function (content) {
    var shasum = crypto.createHash('sha1');
    shasum.update(content, 'utf8');
    return shasum.digest('base64');
}

exports.md5Encrypt = function (content) {
    var shasum = crypto.createHash('md5');
    shasum.update(content, 'utf8');
    return shasum.digest('base64');
}
exports.aesEncrypt = function(data, secretKey) {
    var cipher = crypto.createCipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}; /**
 * aes解密
 * @param data
 * @param secretKey
 * @returns {*}
 */
exports.aesDecrypt = function(data, secretKey) {
    var cipher = crypto.createDecipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
};
