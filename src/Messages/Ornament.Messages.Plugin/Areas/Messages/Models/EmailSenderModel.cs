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

        
    }
}