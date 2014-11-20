/**
 * Created by leo-home on 2014/11/15.
 */
var dao = require("./dao").getProvider("friends");

/*
 scheman.
 {
 owner:loginId,
 target:loginId,
 targetEnabled:true,
 ownerEnabled:true
 }

 */
var listFriend = function (loginId, callback) {
    dao.do(function (collection) {
        var friends = collection.select({owner: loginId}).toArray();
        callback(friends)
    })
}

exports.Init = function (socket, userManager) {

    socket.on('list friend', function (strPublicKey) {
        //暂时列出所有在线用户
        var loginId = userManager.getUser(strPublicKey).loginiId;
        listFriend(loginId, function (data) {
            var resuult = [];
            for (var i = 0; i < data.length; i++) {
                var user = userManager.getUserByLoginId(data[i].target);
                if (user == null) {
                    user = {
                        loginId: data[i],
                        status: 'offline'
                    }
                }
                result.push({
                    loginId: user.loginId,
                    status: user.status
                });
            }
            socket.emit('list friend', resuult);
        })

    });

}
