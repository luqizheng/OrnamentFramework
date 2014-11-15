var user = {};
var pubKeyMap = {};

exports.get = function (publickey) {
    var loginid = pubKeyMap[publickey];
    return user[loginid];
}

exports.count = function () {
    return user.length;
}

exports.addUser = function (loginid, publickey, socket) {
    user[loginid] = {socket: socket, pubKey: publickey, status: 'normal', loginId: loginid};//status is normal busy,offline
    pubKeyMap[publickey] = loginid;
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