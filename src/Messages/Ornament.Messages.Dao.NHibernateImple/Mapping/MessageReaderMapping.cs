using FluentNHibernate.Mapping;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class MessageReaderMapping : ClassMap<MessageReader>
    {
        public MessageReaderMapping()
        {
            Table("Msgs_MessageReader");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            this.References(x => x.Message);
            this.References(x => x.Reader);
        }
    }
}