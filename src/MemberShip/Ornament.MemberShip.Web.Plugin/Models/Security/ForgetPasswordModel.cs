using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;
using Ornament.MemberShip.Web.Plugin.Properties;

namespace Ornament.MemberShip.Web.Plugin.Models.Security
{
    public class ForgetPasswordModel
    {
        public enum RetrievePasswordResult
        {
            Success,
            NotExistAccountOrEmail
        }

        /// <summary>
        /// </summary>
        [Required(ErrorMessageResourceType = typeof (Resources),
            ErrorMessageResourceName = "alertMsg_RequireAccount")]
        public string Account { get; set; }

        [Required]
        public string Email { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="daoDaoFactory"></param>
        public RetrievePasswordResult Retrieve(IMemberShipDaoFactory daoDaoFactory)
        {
            User user = null;
            if (!String.IsNullOrEmpty(Account))
            {
                user = daoDaoFactory.CreateUserDao().GetByLoginId(Account);
            }
            else if (!string.IsNullOrEmpty(Email))
            {
                user = daoDaoFactory.CreateUserDao().GetUserByEmail(Email);
            }


            if (user == null)
            {
                return RetrievePasswordResult.NotExistAccountOrEmail;
            }

            EmailVerifier emailToken = user.Security.ResetPassword(daoDaoFactory, 50);
            var direct = new Dictionary<string, string>
            {
                {"name", user.Name},
                {"loginId", user.LoginId},
                {"parameters", emailToken.CreateQueryString()}
            };
            OrnamentContext.Configuration.MessagesConfig.RetrivePassword.Send(daoDaoFactory, direct, user);
            return RetrievePasswordResult.Success;
        }
    }
}