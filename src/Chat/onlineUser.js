var map=require("hashmap").HashMap;
var user = {};
/**
 * Key is publicKey, and the obj is loginId
 * @type {{}}
 */
var pubKeyMap = new map();

exports.get = function (publickey) {

    pubKeyMap.forEach(function(value, key) {
        console.log(key + " : " + value);
        console.log(key==publickey);
    });
    var loginid = pubKeyMap.get(publickey);
    console.log(loginid);
    return user[loginid];
}

exports.count = function () {
    return user.length;
}

exports.changeStatus = function (loginid, status) {
    var u = user[loginid]
    u.status = status;
}
exports.changeMsg = function (loginid, msg) {
    user[loginId].msg = msg;
}

exports.addUser = function (userInfo, socket) {
    var d = {
        socket: socket,
        publicKey: userInfo.publicKey,
        status: 'normal',
        loginId: userInfo.loginId,
        msg: "", name: userInfo.name};//status is normal busy,offline
    user[d.loginId] = d;

    pubKeyMap.set(userInfo.publicKey, d.loginId);

    console.log("valid is success,and add user " + d.loginId)
}
/**
 * 根据loginid获取user对象
 * @param loginid
 * @returns {socket:socket,pubKye:publicshKey,status:'normal or busy or offline',loginId:'loginId'}
 */
exports.getByLoginId = function (loginid) {
    var result = user[loginid];
    if (!result)
        return null;
    return result;
}

exports.list = function () {
    var users = [];
    for (var key in user) {
        users.push({loginId: user[key].loginId, status: user[key]});
    }
    return users;
}