using System;
using System.Net.Mail;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;

namespace Ornament.Messages.Notification.Senders
{
    public class EmailSender : Sender
    {
        private readonly SmtpClient _smtpClient;

        public EmailSender(string name,SmtpClient smtpClient, string supportEmail, IMemberShipFactory memberShipFactory,
            IMessageDaoFactory daoFactory)
            : base(name,memberShipFactory, daoFactory)
        {
            SupportEmail = supportEmail;
            if (smtpClient == null)
            {
                throw new ArgumentNullException("smtpClient");
            }
            _smtpClient = smtpClient;
        }

        public string SupportEmail { get; private set; }

        protected override void Send(NotifyMessageTemplate template, User[] performers)
        {
            foreach (User user in performers)
            {
                Content content = template.GetContent(user);

                var mailMessage =
                    new MailMessage(new MailAddress(SupportEmail),
                        new MailAddress(user.Contact.Email))
                    {
                        Body = content.Value,
                        Subject = content.Subject,
                        IsBodyHtml = true
                    };
                _smtpClient.Send(mailMessage);
            }
        }
    }
}