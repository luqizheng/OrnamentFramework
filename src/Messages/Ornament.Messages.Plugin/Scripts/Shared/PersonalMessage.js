define(function (require) {
    var $ = require('jquery'),url="/api/message";
    

    var message = function (loginId) {
        this.loginId = loginId;
    };

    message.prototype.List = function (callbackFun) {

    };

    message.prototype.MakeRead = function (id) {

    };
})