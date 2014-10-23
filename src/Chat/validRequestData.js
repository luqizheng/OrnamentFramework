var crypto = require('crypto');
var orgConfig = require("./orgDao").config;
var dbUser = require('./dao').getProvider("user");


exports.validUser = function (userRequestData, callback) {
    /*{
     loginId:orgName,
     requestDate:"YYYYMMDD HH:mm:ss",
     userPubKey:base64Encode
     }
     */

    dbUser.do(function (collection) {
        var user = collection.findOne({"loginId": userRequestDate.loginId});
        if (user.length == 0)
            return false;
        var selfEncrypt = sh1Encrypt(user.loginId + ";" + md5Encrypt(user.privateKey) + ";" + formatDate(userRequestData.requestDate));
        console.log("validate user result:" + selfEncrypt + "=" + userRequestData.userPubKey)
        callback(selfEncrypt == userRequestData.userPubKey)
    })
}

exports.validOrg = function (org, createDate, requestPubKey, callback) {
    console.log("org:" + org);
    console.log(orgConfig[org]);
    var selfEncrypt = encryptOrg(org, createDate, orgConfig[org].apiKey);
    console.log("validate Org result:" + selfEncrypt + "=" + requestPubKey)
    callback(selfEncrypt == requestPubKey);

}

function encryptOrg(orgName, createDate, apiKey) {
    console.log("encryptOrg orgName:"+orgName+" createDate:"+createDate+",apiKey:"+apiKey);
    var data = sh1Encrypt(orgName + ";" + formatDate(createDate) + ";" + md5Encrypt(apiKey));
    return data;
}

var formatDate = function (date) {
    if (typeof date == "object") {
        return date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDay() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    }

    return date;
};


var sh1Encrypt = function (content) {
    var shasum = crypto.createHash('sha1');
    shasum.update(content, 'utf8');
    return shasum.digest('base64');
}

var md5Encrypt = function (content) {
    var shasum = crypto.createHash('md5');
    shasum.update(content, 'utf8');
    return shasum.digest('base64');
}
