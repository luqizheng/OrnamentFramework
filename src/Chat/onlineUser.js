var user = {};
var pubKeyMap={};

exports.get = function (publickey) {
    var loginid=pubKeyMap[publickey];
    return user[loginid];
}

exports.count = function () {
    return user.length;
}

exports.addUser = function (loginid, publickey, socket) {
    user[loginid] = {socket: socket, pubKey: publickey}
    pubKeyMap[publickey]=loginid;
}
