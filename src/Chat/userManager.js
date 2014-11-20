/**
 * Created by leo on 2014/10/21.
 */
var sso = require("./sso"),
    onlineUser = require("./onlineUser");

/**
 *
 * @param data{loginId:"",publicKey:"",name:"username},
 * @param socket
 * @param callback
 */
var valid = function (data, socket, callback) {
    /*
     data.loginId=XXX,
     data.publicKey=XX,
     data.name=""
     */
    console.log('starting to valid publicKey:' + data.publicKey + " loginid:" + data.loginId);
    sso.validPublicKey(data.publicKey, function (result) {
        console.log("sso validate result:" + JSON.stringify(result));
        if (result.success) {
            if (result.loginId == data.loginId) {
                onlineUser.addUser(data,socket)
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