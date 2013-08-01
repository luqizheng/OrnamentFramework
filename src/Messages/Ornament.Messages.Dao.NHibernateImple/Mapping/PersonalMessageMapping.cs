using FluentNHibernate.Mapping;
using Ornament.Messages.PersonalMessages;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class PersonalMessageMapping : ClassMap<PersonalMessage>
    {
        public PersonalMessageMapping()
        {
            Table("Msgs_PersonalMessage");
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.CreateTime).Insert();
            Map(x => x.Content).Length(5000);
            Map(x => x.ReadStatus);
            Map(x => x.DeleteStatus);
            References(x => x.Publisher);
            References(x => x.Receiver);


        }
    }
}