/**
 * Created by leo on 2014/10/21.
 */
var validation = require("./validRequestData");
var userDao = require("./dao").getProvider("user");
exports.regUser = function (data, callback) {
    /*{
     org:"org",
     requestDate:"yyyyMMdd HH:mm:ss"
     orgPubKey:"d$#@!@!",
     loginId:"kdjfkdj",
     userPrivateKey:"kdjfkdjf"
     } */
    console.log("inputData:" + JSON.stringify(data));
    var orgName = data.orgName;
    var orgReqestDate = data.requestDate;
    var orgPubKey = data.orgPubKey;
    validation.validOrg(orgName, orgReqestDate, orgPubKey, function (success) {

        var result = {
            succcess: false,
            message: "success",
            loginId: data.loginId
        };

        if (success) {
            if (data.loginId && data.privateKey) {
                console.log("try to find user " + data.loginId);
                userDao.do(function (collection) {
                    var result = collection.find({loginId: data.loginId}).toArray();
                    if (result.length == 0) {
                        userDao.do(function (collection) {
                            collection.isnert({loginId: data.loginId, privateKey: data.password})
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