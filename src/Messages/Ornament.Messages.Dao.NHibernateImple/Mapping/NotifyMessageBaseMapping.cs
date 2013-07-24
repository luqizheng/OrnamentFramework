using FluentNHibernate.Mapping;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class NotifyMessageBaseMapping : ClassMap<NotifyMessageBase>
    {
        public NotifyMessageBaseMapping()
        {
            this.Table("Msgs_Message");
            this.Map(x => x.ReadStatus);
            References(x => x.User);
            DiscriminateSubClassesOnColumn("messageType").Length(10);
        }
    }
}