using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Properties;
using Ornament.MemberShip.Security;

namespace Ornament.MemberShip.Plugin.Models.Security
{
    public class ForgetPasswordModel
    {
        private readonly EmailVerifier _verifier;

        public ForgetPasswordModel(EmailVerifier verifier)
        {
            if (verifier == null)
                throw new ArgumentNullException("verifier");
            _verifier = verifier;
        }

        public ForgetPasswordModel()
        {
        }

        /// <summary>
        /// </summary>
        [Display(Name = "label_AccountOrEmail", ResourceType = typeof(Resources))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(Resources),
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

            user.Security.ResetPassword(daoFactory, 50);
            var direct = new Dictionary<string, string>
            {
                {"name", user.Name}
            };
            OrnamentContext.Configuration.MessagesConfig.RetrivePassword.Publish(daoFactory, direct, user);
            return RetrievePasswordResult.Success;
        }

        public enum RetrievePasswordResult
        {
            Success,
            NotExistAccountOrEmail

        }
    }
}