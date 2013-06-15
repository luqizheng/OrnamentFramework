using FluentNHibernate.Mapping;
using Ornament.Messages.Newses;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class MessageTypeMapping : ClassMap<NewsType>
    {
        public MessageTypeMapping()
        {
            this.Table("Msgs_NewsType");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            Map(x => x.Name).Length(50);
            Map(x => x.Remark).Length(200);
        }
    }
}