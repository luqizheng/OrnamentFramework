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
            get
            {
                var result = ConfigurationManager.AppSettings["DomainUrl"];
                if (result.EndsWith("/"))
                {
                    return result.TrimEnd('/');
                }
                return result;
            }
        }
    }
}