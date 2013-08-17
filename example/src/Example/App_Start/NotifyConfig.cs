using System.Net.Mail;
using Ornament.Messages.Config;
using Ornament.Messages.Notification.Senders;

namespace Ornament.MVCWebFrame.App_Start
{
    public static class NotifyConfig
    {
        public static void Register()
        {
            NotifySenderManager
                .Instance
                .Add(new EmailSender(new SmtpClient(),
                                     OrnamentContext.Configuration.ApplicationSetting.SupportEmail),
                     new ClientSender(OrnamentContext.DaoFactory.MessageDaoFactory)
                );
        }
    }
}