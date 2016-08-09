using System.Net;
using System.Threading.Tasks;
#if NET461
using System.Net.Mail;

#endif

namespace Ornament.Notify.Senders
{
    public class EmailSender
    {
#if NET461
        private SmtpClient _smtpClient;
#endif

        protected EmailSender()
        {
        }

        public EmailSender(string server, string fromEmail)

        {
            FromEmail = fromEmail;
            SmtpServer = server;
            Port = 25;
        
        }


#if NET461
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

        public virtual Task Send(MailMessage mailMessage)
        {
            return Client.SendMailAsync(mailMessage);
        }
    }
}