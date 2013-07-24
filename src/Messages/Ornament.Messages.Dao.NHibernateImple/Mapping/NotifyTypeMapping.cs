using FluentNHibernate.Mapping;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class NotifyTypeMapping : ClassMap<NotifyType>
    {
        public NotifyTypeMapping()
        {
            Table("Msgs_notifyType");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            Map(x => x.Name).Length(32);
            Map(x => x.Remark).Length(256);
            Map(x => x.CommunicationType).Length(16);
            
        }
    }
}