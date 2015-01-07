﻿using System;
using System.Collections.Generic;
using System.Net;
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

        public EmailSender(string name, string server, string fromEmail)
            : base(name)
        {
            FromEmail = fromEmail;
            SmtpServer = server;
            Port = 25;
        }

        public virtual SmtpClient Client
        {
            get
            {
                if (_smtpClient == null)
                {
                    _smtpClient = new SmtpClient(SmtpServer, Port);
                    if (!String.IsNullOrEmpty(Account))
                        _smtpClient.Credentials = new NetworkCredential(this.Account, this.Password);
                }
                return _smtpClient;
            }
        }

        /// <summary>
        ///     smpt服务器地址
        /// </summary>
        public virtual string SmtpServer { get; set; }

        /// <summary>
        ///     断开
        /// </summary>
        public virtual int Port { get; set; }

        /// <summary>
        ///     email
        /// </summary>
        public virtual string FromEmail { get; set; }

        /// <summary>
        ///     服务器使用的账号
        /// </summary>
        public virtual string Account { get; set; }

        /// <summary>
        ///     服务器使用的密码
        /// </summary>
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

        public override void Send(NotifyMessageTemplate template, CreateVariablesHandler dynamicCreateVariablesHandler, User[] users)
        {
            foreach (User u in users)
            {
                IDictionary<string, string> varibale = dynamicCreateVariablesHandler(u);
                Content content = template.GetContent(u);
                var helper = new NamedFormatterHelper();
                string subject = helper.Replace(content.Subject, varibale);
                string body = helper.Replace(content.Value, varibale);

                Send(subject, body, u.Contact.Email, FromEmail);
            }
        }
    }
}