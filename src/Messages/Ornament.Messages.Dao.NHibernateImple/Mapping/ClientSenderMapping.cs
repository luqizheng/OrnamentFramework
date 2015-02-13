using FluentNHibernate.Mapping;
using Ornament.Messages.Notification.Senders;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class ClientSenderMapping : SubclassMap<ClientSender>
    {
        public ClientSenderMapping()
        {
            this.DiscriminatorValue("Client");
            this.Map(x => x.Server);
            this.Map(x => x.PrivateCode);
            this.Map(x => x.ClientName);
        }
    }
}