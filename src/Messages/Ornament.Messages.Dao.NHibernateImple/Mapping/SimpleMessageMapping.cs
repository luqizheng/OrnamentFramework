using FluentNHibernate.Mapping;
using Ornament.Messages.Notification.Contents;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class SimpleMessageMapping : SubclassMap<SimpleMessage>
    {
        public SimpleMessageMapping()
        {
            this.DiscriminatorValue("simple");
            this.Map(s => s.CreateTime);

            this.Component(s => s.Content, f =>
                {
                    f.Map(a => a.Language);
                    f.Map(a => a.Subject);
                    f.Map(a => a.Value);
                });
        }
    }
}