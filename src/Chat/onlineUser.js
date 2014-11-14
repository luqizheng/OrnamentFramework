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
    user[loginid] = {socket: socket, pubKey: publickey, status: 'normal'};//status is normal busy,offline
    pubKeyMap[publickey] = loginid;
}


exports.list=function(){
    var users=[];
    for(var key in user){
        users.push({loginId:user[key].loginId,status:user[key]});
    }
    return users;
}