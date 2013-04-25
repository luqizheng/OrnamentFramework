using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Secret;
using Qi;

namespace Ornament.Templates
{
    public class EmailTemplateManager
    {
        private const string _path = "~/Templates/Email/";
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public EmailTemplate GetCreateUser()
        {
            return TemplateManager.Get<EmailTemplate>(ApplicationHelper.MapPath(_path + "Createuser.xml"));
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public EmailTemplate ForgetPassword()
        {
            return TemplateManager.Get<EmailTemplate>(ApplicationHelper.MapPath(_path + "ForgetPassword.xml"));
        }
        
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="token"></param>
        /// <param name="domainUrl"></param>
        /// <returns></returns>
        public IDictionary<string, string> GetValues(UserSecretToken token,string domainUrl)
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