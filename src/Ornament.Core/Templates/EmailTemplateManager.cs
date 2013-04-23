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

    }
}