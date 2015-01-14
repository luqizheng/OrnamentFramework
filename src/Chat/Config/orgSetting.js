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
        if (setting[strName]) {
            return {
                valid: function (createDate, token, callback) {
                    console.log("org:" + org);
                    console.log(orgConfig[org]);
                    var selfEncrypt = encryptOrg(org, createDate, orgConfig[org].apiKey);
                    console.log("validate Org result:" + selfEncrypt + "=" + token)
                    callback(selfEncrypt == token);
                }

            }
        }
        return false;
    }