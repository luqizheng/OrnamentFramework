/**
 * Created by leo on 2014/10/21.
 */
var validation = require("./validRequestData"),
    sso = require("./sso"),
    onlineUser = require("./onlineUser");

exports.valid = function (data, socket, callback) {
    /*
     data.loginId=XXX,
     data.publicKey=XX,
     */
    console.log('starting to valid publicKey:' + data.publicKey + " loginid:" + data.loginId);
    sso.validPublicKey(data.publicKey, function (result) {
        if (result.success) {
            if (result.loginId == data.loginId) {
                console.log("valid success.")
                onlineUser.addUser(data.loginId, data.publicKey, socket)
            }
            else {
                console.log("loginid not equal")
                result.error = "loginid not correct";
                callback(result);
                return;
            }
        }
        callback(result);
    })
}

exports.getUser = function (strPublicKey) {
    return onlineUser.get(strPublicKey)
}
