using System;
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
            this.Account = sender.Account;
            SmtpServer = sender.SmtpServer;
            Password = sender.Password;
            Port = sender.Port;
            SupportEmail = sender.FromEmail;
        }

        /// <summary>
        ///     smtp服务器地址
        /// </summary>
        public virtual string SmtpServer { get; set; }

        /// <summary>
        ///     服务器断开，默认是25
        /// </summary>
        public virtual int Port { get; set; }

        /// <summary>
        ///     发邮件的默认Eimal地址
        /// </summary>
        public virtual string SupportEmail { get; set; }

        /// <summary>
        ///     登录账号
        /// </summary>
        public virtual string Account { get; set; }

        /// <summary>
        ///     登录密码
        /// </summary>
        public virtual string Password { get; set; }


        public Sender CreateSender(int? id, IMessageDaoFactory messageDaoFactory)
        {
            Sender sender = id != null
                ? messageDaoFactory.NotifySenderDao.Get(id.Value)
                : new EmailSender("", SmtpServer, SupportEmail);
            var emailSender = sender as EmailSender;
            if (emailSender != null)
            {
                emailSender.FromEmail = String.IsNullOrEmpty(SupportEmail) ? Account : SupportEmail;
                emailSender.Password = Password;
                emailSender.Port = Port;
                emailSender.Account = Account;
                emailSender.SmtpServer = SmtpServer;
            }
            else
            {
                throw new NotifySenderException("Can't change the SenderType to other");
            }
            return sender;
        }

        public Sender Modify(int? id, IMessageDaoFactory messageDaoFactory)
        {
            var result = messageDaoFactory.NotifySenderDao.Get(id.Value);
            var emailSender = result as EmailSender;
            if (emailSender != null)
            {
                emailSender.FromEmail = String.IsNullOrEmpty(SupportEmail) ? Account : SupportEmail;
                emailSender.Password = Password;
                emailSender.Port = Port;
                emailSender.Account = Account;
                emailSender.SmtpServer = SmtpServer;
            }
            return emailSender;

        }
    }

    public class NotifySenderException : ApplicationException
    {
        public NotifySenderException(string message) : base(message)
        {
        }
    }
}