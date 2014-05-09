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
            References(x => x.Publisher).ForeignKey("msg_pm_pub_UserFK");
            References(x => x.Receiver).ForeignKey("msg_pm_receive_UserFK");


        }
    }
}