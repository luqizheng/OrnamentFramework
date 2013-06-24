using System;
using System.Configuration;

namespace Ornament.Contexts
{
    public class ApplicationSetting
    {
        public string SupportEmail
        {
            get { return ConfigurationManager.AppSettings["SupportEmail"]; }
        }
        public bool EnableVerifyCode
        {
            get { return Convert.ToBoolean(ConfigurationManager.AppSettings["VerifyCode"] ?? "false"); }
        }
        public string WebDomainUrl
        {
            get
            {
                string result = ConfigurationManager.AppSettings["DomainUrl"];
                if (result.EndsWith("/"))
                {
                    return result.TrimEnd('/');
                }
                return result;
            }
        }
    }
}