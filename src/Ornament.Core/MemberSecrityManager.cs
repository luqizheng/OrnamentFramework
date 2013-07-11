using System;
using System.Collections.Generic;
using System.Net.Mail;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;
using Ornament.Messages;
using Qi.Text;

namespace Ornament
{
    public class MemberSecrityManager : IDisposable
    {
        private readonly IUserSecurityTokenDao _dao;
        private readonly IMemberShipFactory _memberShipFactory;
        private IDictionary<string, string> _variables;

        public MemberSecrityManager(IMemberShipFactory memberShipFactory, SmtpClient client, User user)
        {
            User = user;

            if (memberShipFactory == null) throw new ArgumentNullException("memberShipFactory");
            if (client == null) throw new ArgumentNullException("client");
            _dao = memberShipFactory.CreateUserSecurityTokenDao();
            _memberShipFactory = memberShipFactory;
            SmtpClient = client;
        }

        public User User { get; set; }


        public string Action { get; set; }
        public int ExpireTimeMiniutes { get; set; }

        public SmtpClient SmtpClient { get; set; }

        public IDictionary<string, string> Variables
        {
            get
            {
                return _variables ?? (_variables = new Dictionary<string, string>
                    {
                        {"url", ""},
                        {"name", ""},
                        {"site", OrnamentContext.Configuration.ApplicationSetting.SiteName}
                    });
            }
        }

        public void Dispose()
        {
            SmtpClient.Dispose();
        }

        /// <summary>
        ///     Send Token by emial.
        /// </summary>
        public void SendToken()
        {
            var token = new UserSecretToken(User, Action, ExpireTimeMiniutes);
            _dao.SaveOrUpdate(token);
            Content template = OrnamentContext.Configuration.MessagesConfig.EmailAddressChanged.Show(Language(User));
            Variables["url"] =
                token.CreateQueryString(OrnamentContext.Configuration.ApplicationSetting.WebDomainUrl + "/Security/" + this.Action);
            Variables["name"] = User.Name;
            Content content = Replace(template, Variables);
            SendEmail(User.Contact.Email, content);
        }

    
        private string Language(User user)
        {
            ProfileValue prfile = _memberShipFactory.CreateProfileDao().FindByLoginId(user.LoginId);

            if (prfile != null && prfile.Properities.ContainsKey("language"))
            {
                return prfile.Properities["language"].ToString();
            }
            return OrnamentContext.Configuration.DefaultLanguage.Key;
        }

        private void SendEmail(string receive, Content content)
        {
            var mailMessage =
                new MailMessage(new MailAddress(OrnamentContext.Configuration.ApplicationSetting.SupportEmail),
                                new MailAddress(receive))
                    {
                        Body = content.Value,
                        Subject = content.Subject,
                        IsBodyHtml = true
                    };

            SmtpClient.Send(mailMessage);
        }

        private Content Replace(Content templateContent, IDictionary<string, string> variableds)
        {
            var helper = new NamedFormatterHelper();
            return new Content
                {
                    Subject = helper.Replace(templateContent.Subject, Variables),
                    Value = helper.Replace(templateContent.Value, Variables)
                };
        }

        public static MemberSecrityManager CreateEmailChangedToken(User user, int expireMiniutes)
        {
            var manager = new MemberSecrityManager(OrnamentContext.DaoFactory.MemberShipFactory, new SmtpClient(), user)
                {
                    Action = "VerifyEmail",
                    ExpireTimeMiniutes = expireMiniutes
                };
            return manager;
        }

        /// <summary>
        ///     Create a new user and should need user to verify the email address.
        /// </summary>
        public static MemberSecrityManager CreateNewUser(User user, int expireMiniutes)
        {
            var manager = new MemberSecrityManager(OrnamentContext.DaoFactory.MemberShipFactory, new SmtpClient(), user)
                {
                    Action = "VerifyEmail",
                    ExpireTimeMiniutes = expireMiniutes,
                };
            return manager;
        }

        /// <summary>
        ///     Create a new user and should need user to verify the email address.
        /// </summary>
        public static MemberSecrityManager ForgetPassword(User user, int expireMiniutes)
        {
            var manager = new MemberSecrityManager(OrnamentContext.DaoFactory.MemberShipFactory, new SmtpClient(), user)
                {
                    Action = "RetrievePassword",
                    ExpireTimeMiniutes = expireMiniutes,
                };
            return manager;
        }
    }
}