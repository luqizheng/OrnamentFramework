/**
 * Created by leo on 2015/1/14.
 */
var encryptUtil = require("./encryptUtil")
var dateFormat = require("./dateformat");

var setting = {
    orn: {
        apiKey: "1234567890"
    }
};


function encryptOrg(orgName, createDate, apiKey) {
    console.log("encryptOrg orgName:" + orgName + " createDate:" + createDate + ",apiKey:" + apiKey);
    var data = encryptUtil.sh1Encrypt(orgName + ";" + dateFormat.formatDate(createDate) + ";" + encryptUtil.md5Encrypt(apiKey));
    return data;
}

exports.get = function (strName) {
    console.log("try to find " + strName + "Name");
    if (setting[strName]) {
        return {
            name: strName,
            apiKey: setting[strName].apiKey,
            valid: function (createDate, token, callback) {
                var selfEncrypt = encryptOrg(this.name.toString(), createDate, this.apiKey.toString());
                var validateResult = selfEncrypt == token;
                console.log("validate Org result:" + validateResult)
                if (!validateResult) {
                    console.log('input token:' + token)
                    console.log('self encypt:' + selfEncrypt)
                }
                callback(validateResult);
            }
        }
    }
    console.log('orgSetting: cannot find ' + strName + ' in orgSetting.')
    return false;
}