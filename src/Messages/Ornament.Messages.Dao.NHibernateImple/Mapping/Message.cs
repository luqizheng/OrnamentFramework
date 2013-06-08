using FluentNHibernate.Mapping;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class MessageMapping : ClassMap<Message>
    {
        public MessageMapping()
        {
            Table("Msgs_Message");
            Id(x => x.Id).GeneratedBy.UuidHex("N");

            Map(x => x.CreateTime);
            Map(x => x.Priority).Column("msgPriority");
            Map(x => x.EffectTime);
            Map(x => x.State);
            Map(x => x.PublishTime);
            References(x => x.Publisher);
            References(x => x.Type);
            HasMany(x => x.Contents)
                .AsMap(s => s.Language).Cascade.AllDeleteOrphan()
                .Table("Msgs_Content")
                .Component(x =>
                    {
                        x.Map(a => a.Value);
                        x.Map(a => a.Subject);
                        x.Map(a => a.Language, "language2");
                    }
                );
            this.DynamicUpdate();
            HasMany(x => x.Readers).Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore).Cascade.None();
        }
    }
}