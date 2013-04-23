using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Secret;
using Qi;

namespace Ornament.Templates
{
    public class EmailTemplateManager
    {
        private const string _path = "~/Templates/Email/";

        public EmailTemplate GetCreateUser()
        {
            return TemplateManager.Get<EmailTemplate>(ApplicationHelper.MapPath(_path + "Createuser.xml"));
        }

        public EmailTemplate ForgetPassword()
        {
            return TemplateManager.Get<EmailTemplate>(ApplicationHelper.MapPath(_path + "ForgetPassword.xml"));
        }

        public IDictionary<string, string> GetValues(User user,
                                                     UserSecretToken token,
                                                     string password, string domainUrl)
        {
            var result = new Dictionary<string, string>
                {
                    {"LoginId", user.LoginId},
                    {"Password", password},
                    {"Name", user.Name},
                    {"Email", user.Email},
                    {"Url", domainUrl + "?" + token.CreateQueryString(user)}
                };
            return result;
        }
    }
}