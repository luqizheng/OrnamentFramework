using FluentNHibernate.Mapping;
using Ornament.Messages.Notification;
using Ornament.Messages.Notification.Senders;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class SenderMapping : ClassMap<Sender>
    {
        public SenderMapping()
        {
            Table("Msgs_Sender");
            Id(x => x.Id).GeneratedBy.Increment();
            DynamicUpdate();
            this.Map(s => s.Name).Length(64);
            this.Map(s => s.Remarks).Length(255);
            DiscriminateSubClassesOnColumn<string>("SenderType");
        }
    }
}