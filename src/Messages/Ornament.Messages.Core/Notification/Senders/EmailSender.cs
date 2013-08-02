using System;
using System.Net.Mail;
using System.Runtime.Remoting.Messaging;

namespace Ornament.Messages.Notification.Senders
{
    public class EmailSender : ISender
    {
        private readonly SmtpClient _smtpClient;

        public EmailSender(SmtpClient smtpClient, string supportEmail)
        {
            SupportEmail = supportEmail;
            if (smtpClient == null) throw new ArgumentNullException("smtpClient");
            _smtpClient = smtpClient;
        }

        public string SupportEmail { get; set; }

        public CommunicationType CommunicationType
        {
            get { return CommunicationType.Email; }
        }

        /// <summary>
        /// </summary>
        /// <param name="notifyMessage"></param>
        public void Send(SimpleMessage notifyMessage)
        {
            Content content = notifyMessage.Content;
            var mailMessage =
                new MailMessage(new MailAddress(SupportEmail),
                                new MailAddress(notifyMessage.User.Contact.Email))
                    {
                        Body = content.Value,
                        Subject = content.Subject,
                        IsBodyHtml = true
                    };

            _smtpClient.Send(mailMessage);
        }
    }
}