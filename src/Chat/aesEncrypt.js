//come from http://blog.csdn.net/linminqin/article/details/19972751
/**
 * aes加密
 * @param data
 * @param secretKey
 */
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
