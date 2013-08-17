define(function (require) {
    var userUrl = "/api/Users",
        secrityUrl = "/api/security";
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

    User.RetrievePassword = function (accountOrEmail, func) {
    	/// <summary>
    	/// User 静态方法。重新Retrive 密码
    	/// </summary>
    	/// <param name="accountOrEmail"></param>
    	/// <param name="func"></param>
        $.post(secrityUrl, {
            AccountOrEmail: accountOrEmail
        }, func);
    };

    User.VerifyEmail = function (loginId, email,func) {
    	/// <summary>
    	/// 发送验证Email账号
    	/// </summary>
    	/// <param name="loginId"></param>
    	/// <param name="email"></param>
        $.post(userUrl, {
            loginId: loginId,
            email: email
        }, func);

    };

    return User;
});