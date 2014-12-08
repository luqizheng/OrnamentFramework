using System.Collections.Generic;
using System.Net.Mail;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Qi.Text;

namespace Ornament.Messages.Notification.Senders
{
    public class EmailSender : Sender
    {
        private SmtpClient _smtpClient;

        protected EmailSender()
        {
        }

        public EmailSender(string name, string server, string supportEmail)
            : base(name)
        {
            SupportEmail = supportEmail;
            SmtpServer = server;
            Port = 25;
        }

        public virtual SmtpClient Client
        {
            get
            {
                if (_smtpClient != null)
                {
                    _smtpClient = new SmtpClient(SmtpServer, Port);
                }
                return _smtpClient;
            }
        }

        public virtual string Account { get; set; }
        public virtual string SmtpServer { get; set; }
        public virtual int Port { get; set; }


        public virtual string SupportEmail { get; set; }
        public virtual string UserName { get; set; }
        public virtual string Password { get; set; }

        public virtual void Send(string subject, string content, string to, string from)
        {
            var mailMessage =
                new MailMessage(new MailAddress(from),
                    new MailAddress(to))
                {
                    Body = content,
                    Subject = subject,
                    IsBodyHtml = true
                };
            Client.Send(mailMessage);
        }


        public override void Send(IMemberShipDaoFactory memberShipDaoFactory, NotifyMessageTemplate template,
            CreateVariablesHandler dynamicCreateVariablesHandler, User[] user,
            IPerformer[] performers)
        {
            HashSet<User> users = user != null ? new HashSet<User>(user) : new HashSet<User>();
            foreach (IPerformer p in performers)
            {
                foreach (User u in p.GetUsers(memberShipDaoFactory))
                {
                    users.Add(u);
                }
            }


            foreach (User u in users)
            {
                IDictionary<string, string> varibale = dynamicCreateVariablesHandler(u);
                Content content = template.GetContent(u);
                var helper = new NamedFormatterHelper();
                string subject = helper.Replace(content.Subject, varibale);
                string body = helper.Replace(content.Subject, varibale);

                Send(subject, body, u.Contact.Email, SupportEmail);
            }
        }
    }
}