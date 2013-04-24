using System.Configuration;

namespace Ornament.Configurations
{
    public class ApplicationSetting
    {
        public string SupportEmail
        {
            get { return ConfigurationManager.AppSettings["SupportEmail"]; }
        }

        public string WebDomainUrl
        {
            get { return ConfigurationManager.AppSettings["DomainUrl"]; }
        }
    }
}