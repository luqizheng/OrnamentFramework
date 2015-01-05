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
        [Display(Name = "label_AccountOrEmail", ResourceType = typeof (Resources))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof (Resources),
            ErrorMessageResourceName = "alertMsg_RequireAccountOrEmail")]
        public string AccountOrEmail { get; set; }


        /// <summary>
        /// </summary>
        /// <param name="daoDaoFactory"></param>
        public RetrievePasswordResult Retrieve(IMemberShipDaoFactory daoDaoFactory)
        {
            User user = daoDaoFactory.CreateUserDao().GetByLoginId(AccountOrEmail) ??
                        daoDaoFactory.CreateUserDao().GetUserByEmail(AccountOrEmail);
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