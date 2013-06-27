using System;
using System.Collections.Generic;
using System.Net.Mail;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Secret;
using Ornament.Messages;
using Ornament.Messages.Notification;
using Qi.Text;

namespace Ornament
{
    public class MemberSecrityManager : IDisposable
    {
        private readonly SmtpClient _client;
        private readonly IUserSecurityTokenDao _dao;
        private IDictionary<string, string> _variables;

        public MemberSecrityManager(IUserSecurityTokenDao dao, SmtpClient client)
        {
            if (dao == null) throw new ArgumentNullException("dao");
            if (client == null) throw new ArgumentNullException("client");
            _dao = dao;
            _client = client;
        }

        public IDictionary<string, string> Variables
        {
            get
            {
                return _variables ?? (_variables = new Dictionary<string, string>
                    {
                        {"url", ""},
                        {"name", ""}
                    });
            }
        }

        public void Dispose()
        {
            _client.Dispose();
        }

        public void VerifyEmail(User user, int expireMiniutes, string lang)
        {
            UserSecretToken token = UserSecretToken.VerifyEmail(user, expireMiniutes);
            _dao.SaveOrUpdate(token);

            string sender = OrnamentContext.Configuration.ApplicationSetting.SupportEmail;
            string url = OrnamentContext.Configuration.ApplicationSetting.WebDomainUrl;


            var msg = new NotifyMessage { Type = OrnamentContext.Configuration.MessagesConfig.VerifyEmailAddress };
            Content content = msg.Type.Show(lang);


            Variables["url"] = url + "/Security/VerifyEmail?" + token.CreateQueryString();
            Variables["name"] = user.Name;

            var namedFormatterHelper = new NamedFormatterHelper();
            string emailContent = namedFormatterHelper.Replace(content.Value, Variables);

            var mailMessage = new MailMessage(new MailAddress(sender), new MailAddress(user.Email))
                {
                    Body = emailContent,
                    Subject = namedFormatterHelper.Replace(content.Subject, Variables),
                    IsBodyHtml = true
                };

            _client.Send(mailMessage);
        }
    }
}