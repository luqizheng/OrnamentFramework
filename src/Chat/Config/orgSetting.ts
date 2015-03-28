/**
 * Created by leo on 2015/1/14.
 */
import encryptUtil = require("./encryptUtil")
import dateFormat = require("./dateformat");

var setting = {
    orn: {
        apiKey: "1234567890"
    }
};


function encryptOrg(orgName:string, createDate:Date, apiKey:string) {
    console.log("encryptOrg orgName:" + orgName + " createDate:" + createDate + ",apiKey:" + apiKey);
    var data = encryptUtil.sh1Encrypt(orgName + ";" + dateFormat.formatDate(createDate) + ";" + encryptUtil.md5Encrypt(apiKey));
    return data;
}

export class org {
    name:string;
    apiKey:string;
    valid = function (createDate:Date, token:string, callback:Function):void {
        var selfEncrypt = encryptOrg(this.name.toString(), createDate, this.apiKey.toString());
        var validateResult = selfEncrypt == token;
        console.log("validate Org result:" + validateResult)
        if (!validateResult) {
            console.log('input token:' + token)
            console.log('self encypt:' + selfEncrypt)
        }
        callback(validateResult);
    };

    constructor(name:string, apiKey:string) {
        this.name = name;
        this.apiKey = apiKey;
    }

}

export function get(strName:string):org {
    console.log("try to find " + strName + "Name");
    if (setting[strName]) {
        var result = new org(strName, setting[strName].apiKey);
        return result;
    }
    console.log('orgSetting: cannot find ' + strName + ' in orgSetting.')
    return null;
}