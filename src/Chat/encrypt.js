
var crypto = require('crypto');
var config = {
    orn: {
        apiKey: "123454545454"
    }
};

var cache = {};

exports.valid(user, createDate){
    var cacheItem = getCustomeCache(inputData);
}

function getCustomeCache(inputData) {
    
    var data = aesEncrypt(inputData).split(";");
    var customerName = data[0];
    var createDate = data[1];

    var result = cache[customerName];
    if (result != undefined) {
        result = {
            createTime: createDate,
            encryptContent:inputData
        };
        cache[customName] + result;
    }
    return result;
}

var buildKey = function(customName) {
    var data = customName + ";";
};
var fromdate = function(date) {
    return date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDay() + " " + date.getUTCHours()
        + date.getUTCMinutes() + date.getUTCSeconds();
}; //come from http://blog.csdn.net/linminqin/article/details/19972751
/**
 * aes加密
 * @param data
 * @param secretKey
 */
var aesEncrypt = function(data, secretKey) {
    var cipher = crypto.createCipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}; /**
 * aes解密
 * @param data
 * @param secretKey
 * @returns {*}
 */
var aesDecrypt = function(data, secretKey) {
    var cipher = crypto.createDecipher('aes-128-ecb', secretKey);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
};

var sh1Encrypt=function(content) {
    var shasum = crypto.createHash('sha1');
    shasum.update(content,'utf8');
    shasum.digest('base64');
}