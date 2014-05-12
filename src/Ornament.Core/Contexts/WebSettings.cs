using System;
using System.Configuration;
using System.IO;
using Qi;
using Qi.IO;

namespace Ornament.Contexts
{
    public class ApplicationSetting
    {
        public string SupportEmail
        {
            get
            {
                string supportEmail = ConfigurationManager.AppSettings["SupportEmail"];
                if (String.IsNullOrEmpty(supportEmail))
                {
                    throw new ApplicationException("Pleases set SupportEmail in AppSettings.");
                }
                return supportEmail;
            }
        }

        public DirectoryInfo UploadFilesFolder
        {
            get
            {
                string folder = ConfigurationManager.AppSettings["UploadFolder"];
                if (String.IsNullOrEmpty(folder))
                {
                    folder = "~/files/";
                }

                var dir = new DirectoryInfo(ApplicationHelper.MapPath(folder));
                if (!dir.Exists)
                    dir.CreateEx();
                return dir;
            }
        }

        public bool EnableVerifyCode
        {
            get { return Convert.ToBoolean(ConfigurationManager.AppSettings["VerifyCode"] ?? "false"); }
        }

        [Obsolete]
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

        [Obsolete]
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