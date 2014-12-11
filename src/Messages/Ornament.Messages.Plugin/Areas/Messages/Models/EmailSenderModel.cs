using System;
using System.Diagnostics.CodeAnalysis;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification.Senders;

namespace Ornament.Messages.Plugin.Areas.Messages.Models
{
    public class EmailSenderModel
    {
        public EmailSenderModel()
        {

        }

        public EmailSenderModel(EmailSender sender)
        {
            
            this.SmtpServer = sender.SmtpServer;
            this.Password = sender.Password;
            this.Port = sender.Port;
            this.SupportEmail = sender.FromEmail;

        }
        public virtual string Account { get; set; }
        public virtual string SmtpServer { get; set; }
        public virtual int Port { get; set; }


        public virtual string SupportEmail { get; set; }
        public virtual string UserName { get; set; }
        public virtual string Password { get; set; }


        public Sender CreateSender(int? id,IMessageDaoFactory messageDaoFactory)
        {
            Sender sender = id != null
                ? messageDaoFactory.NotifySenderDao.Get(id.Value)
                : new EmailSender("", this.SmtpServer, SupportEmail);
            var emailSender = sender as EmailSender;
            if (emailSender != null)
            {

                emailSender.FromEmail = String.IsNullOrEmpty(SupportEmail) ? this.Account : this.SupportEmail;
                emailSender.Password = Password;
                emailSender.Port = Port;
                emailSender.UserName = Account;
                emailSender.SmtpServer = SmtpServer;
            }
            else
            {
                throw new NotifySenderException("Can't change the SenderType to other");
            }
            return sender;
        }
        
    }

    public class NotifySenderException : ApplicationException
    {
        public NotifySenderException(string message):base(message)
        {
            
        }
    }
}