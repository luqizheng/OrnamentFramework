using FluentNHibernate.Mapping;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class MessageMapping : ClassMap<Message>
    {
        public MessageMapping()
        {
            Table("Msgs_Message");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            this.DynamicUpdate();
            Map(x => x.CreateTime);
            Map(x => x.Priority).Column("msgPriority");
            
            Map(x => x.State);
            
            References(x => x.Publisher).LazyLoad(Laziness.Proxy);
            References(x => x.Type).LazyLoad(Laziness.Proxy);
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
            
            HasManyToMany(x => x.Readers)
                .Table("Msgs_Readers")
                .ParentKeyColumn("messageId")
                .ChildKeyColumn("performerId")
                .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore).Cascade.None();

           
            
        }
    }
}