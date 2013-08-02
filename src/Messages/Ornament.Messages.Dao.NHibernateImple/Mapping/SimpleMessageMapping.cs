using FluentNHibernate.Mapping;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class SimpleMessageMapping : ClassMap<SimpleMessage>
    {
        public SimpleMessageMapping()
        {
            Table("Msgs_SimpleMessage");
            Id(x => x.Id);
            Map(x => x.ReadStatus);
            Map(s => s.CreateTime);

            References(x => x.User);
            Component(s => s.Content, f =>
                {
                    f.Map(a => a.Language);
                    f.Map(a => a.Subject);
                    f.Map(a => a.Value);
                });
        }
    }
}