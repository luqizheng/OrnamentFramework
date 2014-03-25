using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Properties;
using Ornament.MemberShip.Security;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class ForgetPasswordModel
    {
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
        public void Retrieve(IMemberShipFactory daoFactory)
        {

            User user = daoFactory.CreateUserDao().GetByLoginId(AccountOrEmail) ??
                        daoFactory.CreateUserDao().GetUserByEmail(AccountOrEmail);
            if (user == null)
                throw new EmailSecurityException("can't find the account with " + AccountOrEmail);
            var tokern = user.Security.ResetPassword(daoFactory, 50);
            var direct = new System.Collections.Generic.Dictionary<string, string>();
            direct.Add("site", OrnamentContext.Configuration.ApplicationSetting.SiteName);
            direct.Add("url", tokern.CreateQueryString(OrnamentContext.Configuration.ApplicationSetting.WebDomainUrl + "/Security/RetrievePassword"));
            OrnamentContext.Configuration.MessagesConfig.RetrivePassword.Publish(daoFactory, direct, user);
        }
    }
}