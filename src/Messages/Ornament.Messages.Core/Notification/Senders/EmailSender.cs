using System;
using System.Collections.Generic;
using System.Net.Mail;
using Ornament.MemberShip;
using Qi.Text;

namespace Ornament.Messages.Notification.Senders
{
    public class EmailSender : Sender
    {
        private readonly SmtpClient _smtpClient;

        public EmailSender(string name, SmtpClient smtpClient, string supportEmail)
            : base(name)
        {
            SupportEmail = supportEmail;
            if (smtpClient == null)
            {
                throw new ArgumentNullException("smtpClient");
            }
            _smtpClient = smtpClient;
            Port = 25;
        }

        public virtual string Account { get; set; }
        public virtual string SmtpServer { get; set; }
        public virtual int Port { get; set; }


        public virtual string SupportEmail { get; private set; }


        public override void Send(NotifyMessageTemplate template, IDictionary<string, string> varibale,
            User[] performers)
        {
            foreach (User user in performers)
            {
                Content content = template.GetContent(user);
                var helper = new NamedFormatterHelper();

                var mailMessage =
                    new MailMessage(new MailAddress(SupportEmail),
                        new MailAddress(user.Contact.Email))
                    {
                        Body = helper.Replace(content.Value, varibale),
                        Subject = helper.Replace(content.Subject, varibale),
                        IsBodyHtml = true
                    };
                _smtpClient.Send(mailMessage);
            }
        }
    }
}