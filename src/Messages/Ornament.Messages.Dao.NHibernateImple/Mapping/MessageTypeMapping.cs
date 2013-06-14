using FluentNHibernate.Mapping;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class MessageTypeMapping : ClassMap<MessageType>
    {
        public MessageTypeMapping()
        {
            this.Table("Msgs_MessageType");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            Map(x => x.Name).Length(50);
            Map(x => x.Remark).Length(200);
            Map(x => x.OrderId).Length(150);
            References(x => x.Parent).LazyLoad();
        }
    }
}