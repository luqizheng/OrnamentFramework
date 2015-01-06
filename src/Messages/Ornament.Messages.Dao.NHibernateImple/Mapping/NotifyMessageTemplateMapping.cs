using FluentNHibernate.Mapping;
using Ornament.Messages.Notification;
using Ornament.Messages.Notification.Senders;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class NotifyMessageTemplateMapping : ClassMap<NotifyMessageTemplate>
    {
        public NotifyMessageTemplateMapping()
        {
            Table("Msgs_NotifyMsgTemplate");
            Id(x => x.Id).GeneratedBy.UuidHex("N").Length(36);
            Map(x => x.Name).Length(64);
            Map(x => x.Remark).Length(255);



            Version(x => x.ModifyTime);

            HasManyToMany(s => s.Senders)
                .Table("Msgs_MsgTempSenderRel")
                .ParentKeyColumn("MsgTemplateId")
                .ChildKeyColumn("SenderId").ForeignKeyConstraintNames("tempSenderRel_TempFK","tempSenderRel_SenderFK")
                .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);


            HasMany(x => x.Contents)
                .AsMap(s => s.Language).Cascade.AllDeleteOrphan()
                .Table("Msgs_MsgTemplateContent")
                .Component(x =>
                    {
                        x.Map(a => a.Value).CustomSqlType("ntext");
                        x.Map(a => a.Subject).Length(255);
                        x.Map(a => a.Language, "language2").Length(10);
                    });
        }
    }
}