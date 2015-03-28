/**
 * Created by leo-home on 2015/3/23.
 */
/// <reference path='../typings/node/node.d.ts' />
/// <reference path='../typings/socket.io/socket.io.d.ts' />
var user = (function () {
    function user() {
    }
    return user;
})();
exports.user = user;
(function (userStatus) {
    userStatus[userStatus["online"] = 0] = "online";
    userStatus[userStatus["busy"] = 1] = "busy";
    userStatus[userStatus["offline"] = 2] = "offline";
})(exports.userStatus || (exports.userStatus = {}));
var userStatus = exports.userStatus;
;
var onlineUser = (function () {
    function onlineUser() {
    }
    return onlineUser;
})();
exports.onlineUser = onlineUser;
//# sourceMappingURL=user.js.map