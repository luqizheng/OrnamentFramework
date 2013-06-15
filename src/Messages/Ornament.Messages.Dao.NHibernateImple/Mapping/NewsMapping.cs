using FluentNHibernate.Mapping;
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

            HasMany(x => x.Contents)
                .AsMap(s => s.Language).Cascade.AllDeleteOrphan()
                .Table("Msgs_NewsContent")
                .Component(x =>
                    {
                        x.Map(a => a.Value);
                        x.Map(a => a.Subject);
                        x.Map(a => a.Language, "language2");
                    });
        }
    }
}