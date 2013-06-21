using FluentNHibernate.Mapping;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class NotifyMessageMapping : ClassMap<NotifyMessage>
    {
        public NotifyMessageMapping()
        {
            Table("Msgs_NotifyMessage");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            DynamicUpdate();
            Map(x => x.CreateTime);
            Map(x => x.State);

            References(x => x.Publisher);
            References(x => x.Type)

            HasMany(x => x.Contents)
                .AsMap(s => s.Language).Cascade.AllDeleteOrphan()
                .Table("Msgs_NotifyContent")
                .Component(x =>
                    {
                        x.Map(a => a.Value);
                        x.Map(a => a.Subject);
                        //x.Map(a => a.Language, "language2");
                    }
                );
            //HasMany(x => x.Readers).KeyColumn("notifyMessageId");
        }
    }

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