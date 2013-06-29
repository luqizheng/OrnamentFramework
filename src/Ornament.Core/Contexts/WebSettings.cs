using System;
using System.Configuration;

namespace Ornament.Contexts
{
    public class ApplicationSetting
    {
        public string SupportEmail
        {
            get
            {
                var supportEmail= ConfigurationManager.AppSettings["SupportEmail"];
                if (String.IsNullOrEmpty(supportEmail))
                {
                    throw new ApplicationException("Pleases set SupportEmail in AppSettings.");
                }
                return supportEmail;
            }
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

        public string SiteName
        {
            get
            {
                string a = ConfigurationManager.AppSettings["SiteName"];
                if (a == null)
                    throw new ArgumentException("please set AppSetting named SiteName");
                return a;
            }
        }

        public int VerifyEmailTimeout
        {
            get { return Convert.ToInt32(ConfigurationManager.AppSettings["VerifyEmailTimeout"] ?? "144"); }
        }
    }
}