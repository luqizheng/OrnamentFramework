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

       
  
        public ForgetPasswordModel()
        {
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
        /// <param name="daoFactory"></param>
        public RetrievePasswordResult Retrieve(IMemberShipFactory daoFactory)
        {
            User user = daoFactory.CreateUserDao().GetByLoginId(AccountOrEmail) ??
                        daoFactory.CreateUserDao().GetUserByEmail(AccountOrEmail);
            if (user == null)
            {
                return RetrievePasswordResult.NotExistAccountOrEmail;
            }

            EmailVerifier emailToken = user.Security.ResetPassword(daoFactory, 50);
            var direct = new Dictionary<string, string>
            {
                {"name", user.Name},
                {"loginId", user.LoginId},
                {"parameters", emailToken.CreateQueryString()}
            };
            OrnamentContext.Configuration.MessagesConfig.RetrivePassword.Publish(daoFactory, direct, user);
            return RetrievePasswordResult.Success;
        }
    }
}