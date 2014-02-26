
define(function (require) {

    var userUrl = "/api/Users",
        memberUrl = "api/member", //需要登录
        secrityUrl = "/api/security", //无需登录就可以使用的
        WebApi = require("/Scripts/Modules/Combine/WebApi.js");


    function User() {

        this.Id = "";
        this.Name = "";
        this.TimeZoneId = "";

        this.Language = "";
        this.Phone = "";
        this.Email = "";
        this.LoginId = "";

        function Init(obj) {
            this.Name = obj.Name;
            this.TimeZoneId = obj.TimeZoneId;
            this.Language = obj.Language;
            this.Phone = obj.Phone;
            this.Email = obj.Email;
            this.LoginId = obj.LoginId;
        }

        this.load = function () {
            var self = this;
            var webApi = new WebApi(memberUrl + "/get");
            webApi.Get(function (d) {
                Init.call(self, d);
            });
        };
        this.verifyEmail = function () {

        };

        this.save = function (callBack) {
            var webApi = new WebApi(memberUrl + "/save");
            webApi.Post(this, callBack);
        };

    }

    User.ChangePassword = function (strNewPwd, strConfirmPwd, strOldPwd, callbackFunc) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="strNewPwd"></param>
        /// <param name="strConfirmPwd"></param>
        /// <param name="strOldPwd"></param>
        /// <param name="callbackFunc"></param>
        var webApi = new WebApi(memberUrl + "/ChangePassword");
        webApi.Post({
            CurrentPassword: strOldPwd,
            NewPassword: strNewPwd,
            ConfirmPassword: strConfirmPwd
        }, callbackFunc);
    };

    User.RetrievePassword = function (accountOrEmail, func, completeFunc) {
        /// <summary>
        /// User 静态方法。重新Retrive 密码
        /// </summary>
        /// <param name="accountOrEmail"></param>
        /// <param name="func"></param>
        var webApi = new WebApi(secrityUrl);
        if (completeFunc) {
            webApi.CompleteCallBack = completeFunc;
        }
        webApi.Post({
            AccountOrEmail: accountOrEmail
        }, func);
    };

    User.VerifyEmail = function (loginId, email, func, completeFunc) {
        /// <summary>
        /// 发送验证Email账号
        /// </summary>
        /// <param name="loginId"></param>
        /// <param name="email"></param>

        var webApi = new WebApi(userUrl);
        if (completeFunc) {
            webApi.CompleteCallBack = completeFunc;
        }
        webApi.Post({
            loginId: loginId,
            email: email
        }, func);
    };


    return User;
});