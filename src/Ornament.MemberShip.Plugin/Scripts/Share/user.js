/// <reference path="../Share/WebApi.js" />
/// <reference path="/Scripts/Modules/Combine/WebApi.js" />
//Seajs include /MemberShips/Scripts/Share/user.js
define(function (require) {

    var userUrl = "/api/Users",
        secrityUrl = "/api/security";
    var WebApi = require("/Scripts/Modules/Combine/WebApi.js");

    function User(obj) {
        /// <summary>
        ///     obj is a object with o
        /// </summary>
        /// <param name="obj"></param>
        this.Id = this.Name = this.Email = this.LoginId = null;
        if (!obj)
            return;
        if (obj.LoginId) {
            this.LoginId = obj.LoginId;
        }
        if (obj.Id) {
            this.Id = obj.Id;
        }
        if (this.Email) {
            this.Email = obj.Email;
        }
    }

    User.ChangePassword = function (strNewPwd, strConfirmPwd, strOldPwd, callbackFunc) {
    	/// <summary>
    	/// 
    	/// </summary>
    	/// <param name="strNewPwd"></param>
    	/// <param name="strConfirmPwd"></param>
    	/// <param name="strOldPwd"></param>
    	/// <param name="callbackFunc"></param>
        var webApi = new WebApi(userUrl);
        webApi.Put({
            CurrentPassword: strOldPwd,
            NewPassword: strNewPwd,
            ConfirmPassword: strOldPwd
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



    User.load = function (strLoginId) {
        WebApi.get(userUrl, new { loginId: strLoginId }, function () {

        });
    };
    return User;
});