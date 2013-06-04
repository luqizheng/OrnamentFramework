using System.Collections.Generic;
using Ornament.MemberShip.Secret;
using Qi;

namespace Ornament.Templates
{
    public class EmailTemplateManager
    {
        private const string Path = "~/Templates/Email/";

        public void SaveCreateUser(EmailTemplate template)
        {
            TemplateManager.Set(ApplicationHelper.MapPath(Path + "CreateUser.xml"), template);
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public EmailTemplate GetCreateUser()
        {
            return TemplateManager.Get<EmailTemplate>(ApplicationHelper.MapPath(Path + "CreateUser.xml"));
        }
        public void Save(EmailTemplate template, string fileName)
        {
            TemplateManager.Get<EmailTemplate>(ApplicationHelper.MapPath(Path + fileName));

        }
        /// <summary>
        /// </summary>
        /// <returns></returns>
        public EmailTemplate ForgetPassword()
        {
            return TemplateManager.Get<EmailTemplate>(ApplicationHelper.MapPath(Path + "ForgetPassword.xml"));
        }

        public void SaveForgetPassword(EmailTemplate temp)
        {
            TemplateManager.Set(ApplicationHelper.MapPath(Path + "ForgetPassword.xml"), temp);
        }


        /// <summary>
        /// </summary>
        /// <param name="token"></param>
        /// <param name="domainUrl"></param>
        /// <returns></returns>
        public IDictionary<string, string> GetValues(UserSecretToken token, string domainUrl)
        {
            var result = new Dictionary<string, string>
                {
                    {"LoginId", token.Account.LoginId},
                    {"Name", token.Account.Name},
                    {"Email", token.Account.Email},
                    {"Url", domainUrl + "?" + token.CreateQueryString()}
                };
            return result;
        }
    }
}