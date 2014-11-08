/**
 * Created by leo on 2014/10/21.
 */
var validation = require("./validRequestData"),
    sso = require("./sso"),
    onlineUser = require("./onlineUser");

exports.regUser = function (data, socket, callback) {
    /*
     data.loginId=XXX,
     data.publicKey=XX,
     */
    sso.validatePublicKey(data.publicKey, function (result) {
        if (result.success) {
            if (result.loginId == data.loginId) {
                onlineUser.addUser(data.loginId, data.publicKey, socket)
            }
            else {
                console.log("loginid not equal")
                callback(result.success);
                return;
            }
        }
        callback(result.success);
    })
}
exports.getUser=function(strPublicKey){
    return onlineUser.get(strPublicKey)
}
