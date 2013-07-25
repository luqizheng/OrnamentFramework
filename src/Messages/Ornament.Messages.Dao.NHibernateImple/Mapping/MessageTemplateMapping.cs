using FluentNHibernate.Mapping;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class MessageTemplateMapping : ClassMap<MessageTemplate>
    {
        public MessageTemplateMapping()
        {
            Table("Msgs_MessageTemplate");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            Map(x => x.Name).Length(64);
            Map(x => x.Remark).Length(255);
            Map(x => x.Inside);
            Map(x => x.ModifyTime);
            References(x => x.Type);


            HasMany(x => x.Contents)
                .AsMap(s => s.Language).Cascade.AllDeleteOrphan()
                .Table("Msgs_MsgTemplateContent")
                .Component(x =>
                    {
                        x.Map(a => a.Value).CustomSqlType("text");
                        x.Map(a => a.Subject).Length(255);
                        x.Map(a => a.Language, "language2").Length(10);
                    });
        }
    }
}