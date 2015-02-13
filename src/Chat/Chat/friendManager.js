/**
 * Created by leo-home on 2014/11/15.
 */
var dao = require("./../dao").getProvider("friends");
/*
 scheman.
 {
 owner:loginId,
 target:loginId,
 targetEnabled:true,
 ownerEnabled:true
 }

 */

/**
 *
 * @param loginId
 * @param callback
 * @
 */
var listFriend = function (loginId, callback) {

    dao.do(function (collection) {
        console.log("try to find fridns")
        /*var friends = collection.find({owner: loginId});*/
        var friends=[{
            owner:loginId,
            target:"oktest"
        }];
        callback(friends)
    })
}

exports.Init = function (socket, userManager) {

    socket.on('list friend', function (strPublicKey) {

        //暂时列出所有在线用户
        var userObj = userManager.getUser(strPublicKey);
        if (!userObj) {
            console.log("LIST FRIEND: is failed.")
            return;
        }

        var loginId = userObj.loginId;
        listFriend(loginId, function (data) {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var user = userManager.getUserByLoginId(data[i].target);
                if (user == null) {
                    user = {
                        loginId: data[i].target,
                        status: 'offline'
                    }
                }
                result.push({
                    loginId: user.loginId,
                    status: user.status
                });
            }
            console.log("return friend list to client," + JSON.stringify(result))
            socket.emit('list friend', {success: true, data: result});
        })

    });

}
