using FluentNHibernate.Mapping;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class MessageReadStatusMapping : ClassMap<ReaderReadStatus>
    {

        public MessageReadStatusMapping()
        {
            this.Table("Msgs_ReaderReadStatus");
            this.CompositeId()
                .KeyReference(x => x.Reader)
                .KeyReference(x => x.Message);
            this.Map(x => x.Status);
        }
    }
}