using FluentNHibernate.Mapping;
using Ornament.Messages.Notification.Senders;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class EmailSenderMapping : SubclassMap<EmailSender>
    {
        public EmailSenderMapping()
        {
            this.DiscriminatorValue("Email");
            this.Map(s => s.Port);
            this.Map(s => s.SmtpServer).Length(64);
            this.Map(s => s.FromEmail).Length(64);
            this.Map(s => s.Account).Length(64);
            this.Map(s => s.Password).Length(128);
        }
    }
}