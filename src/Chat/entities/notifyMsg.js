/**
 * Created by leo-home on 2015/3/23.
 */
/* msg={
 Content:"content",
 LoginIds=[] //接受者
 Token:publicKey,
 GlobalVariable={}, tempalte data,
 UserData=[{dictionary}],
 IsTemplate:false or not defined,
 Org=org,
 CreateDate,
 */
var notifyMsg = (function () {
    function notifyMsg() {
        this.globalVariable = {};
    }
    return notifyMsg;
})();
exports.notifyMsg = notifyMsg;
//# sourceMappingURL=notifyMsg.js.map