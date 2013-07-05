using FluentNHibernate.Mapping;
using NHibernate;
using Ornament.Messages.Newses;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class NewsMapping : ClassMap<News>
    {
        public NewsMapping()
        {
            Table("Msgs_News");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            DynamicUpdate();
            Map(x => x.CreateTime);


            Map(x => x.State);

            References(x => x.Publisher);
            References(x => x.Type);
            HasMany(x => x.Contents)
                .AsMap(s => s.Language).Cascade.AllDeleteOrphan()
                .Table("Msgs_NewsContent")
                .Component(x =>
                    {
                        x.Map(a => a.Value).CustomSqlType("CLOB");
                        x.Map(a => a.Subject).Length(255);
                        x.Map(a => a.Language, "language2").Length(10);
                    });
        }
    }
}