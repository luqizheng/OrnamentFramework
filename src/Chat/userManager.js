/**
 * Created by leo on 2014/10/21.
 */
var validation = require("./validRequestData");
var userDao = require("./dao")("user");
exports.regUser = function (data, callback) {
    var orgName = data.org;
    var orgReqestDate = data.orgRequestDate;
    var orgPubKey = data.orgPubKey;
    validation.validOrg(orgName, orgReqestDate, orgPubKey, function (success) {

        var result = {
            succcess: false,
            message: "success",
            loginId: data.loginId
        };

        if (success) {
            if (data.loginId && data.password) {
                userDao.do(function (collection) {
                    var result = collection.find({loginId: data.loginId}).toArray()
                    if (result.length == 0) {
                        userDao.do(function (collection) {
                            collection.isnert({loginId: dat.loginId, password: data.password})
                        })
                    }
                })

            }
            else {
                result.message = "password and loginid do not allow empty.";
            }
            result.regSuccess = true;
        }
        else {
            result.message = "org validate fail.";
        }
        callback(result)
    })
}