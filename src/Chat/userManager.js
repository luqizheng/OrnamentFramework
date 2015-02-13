/**
 * Created by leo on 2014/10/21.
 */
var sso = require("./sso"),
    onlineUser = require("./onlineUser"),
    orgManager = require("./config/orgSetting");

/**
 *
 * @param data{loginId:"",publicKey:"",name:"username}, or data{org:''}
 * @param socket
 * @param callback
 */
var valid = function (data, socket, callback) {
    /*
     data.loginId=XXX,
     data.publicKey=XX,
     data.name=""
     or
     data.org=XXX;
     */
    if (data.loginId !== undefined) {
        sso.validPublicKey(data.publicKey, function (result) {
            console.log("sso validate result:" + JSON.stringify(result));
            if (result.success) {
                if (result.loginId == data.loginId) {
                    onlineUser.addUser(data, socket)
                    callback(result);
                }
                else {
                    console.log("loginid not equal")
                    result.error = "loginid not correct";
                    callback(result);
                    return;
                }
            }
        })
    }
    else {
        console.log("validate is org info,"+JSON.stringify(data))
        callback(true);
        //var org = orgManager.get(data.Org);
        //org.valid(data.CreateDate, data.PublicKey, callback);
    }
}
/**
 *
 * @param strPublicKey
 * @returns {socket:socket,pubKye:publicshKey,status:'normal or busy or offline',loginId:'loginId'}
 */
exports.getUser = function (strPublicKey) {
    //根据strPublicKey 获取user 对象。
    return onlineUser.get(strPublicKey)
}
/**
 * 根据Loginid 获取user对象
 * @param loginid 登录id
 * @returns {socket:socket,pubKye:publicshKey,status:'normal or busy or offline',loginId:'loginId'}
 */
exports.getUserByLoginId = function (loginid) {
    return onlineUser.getByLoginId(loginid);
}
exports.Init = function (socket) {
    socket.on('valid', function (data) {
        console.log('receive clien data' + JSON.stringify(data))
        valid(data, socket, function (result) {
            console.log("valid result user by sso " + JSON.stringify(result))
            socket.emit("valid-result", result);
        });
    });


    socket.on('change status', function (data) {
        //改变user的状态
        var user = userManager.getUser(data.loginId)
        user.status = data.status;
        socket.emit(data.status);
    });

    socket.emit('valid'); //发送验证请求。

}