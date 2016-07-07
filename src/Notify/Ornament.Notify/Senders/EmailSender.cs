using System;
using System.Net;
#if NET451
using System.Net.Mail;

#endif

namespace Ornament.Notify.Senders
{
    public class EmailSender : ISender
    {
#if NET451
        private SmtpClient _smtpClient;
#endif

        protected EmailSender()
        {
        }

        public EmailSender(string name, string server, string fromEmail)

        {
            FromEmail = fromEmail;
            SmtpServer = server;
            Port = 25;
            Name = name;
        }

        public string Name { get; }

#if NET451
        public virtual SmtpClient Client
        {
            get
            {
                if (_smtpClient == null)
                {
                    _smtpClient = new SmtpClient(SmtpServer, Port);
                    if (!string.IsNullOrEmpty(Account))
                        _smtpClient.Credentials = new NetworkCredential(Account, Password);
                }
                return _smtpClient;
            }
        }
#endif

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

        public void Send(string content, params object[] sendingParameters)
        {
            if (sendingParameters.Length >= 2)
            {
                throw new ArgumentOutOfRangeException(nameof(sendingParameters));
            }
            var subject = sendingParameters[0].ToString();
            var to = sendingParameters[1].ToString();

            var from = sendingParameters.Length == 3 ? sendingParameters[2] as string : null;

            Send(subject, content, to, from);
        }

        public virtual void Send(string subject, string content, string to, string from)
        {
#if NET451
            var mailMessage =
                new MailMessage(
                    new MailAddress(from ?? FromEmail),
                    new MailAddress(to))
                {
                    Body = content,
                    Subject = subject,
                    IsBodyHtml = true
                };
            Client.Send(mailMessage);
#endif
        }
    }
}