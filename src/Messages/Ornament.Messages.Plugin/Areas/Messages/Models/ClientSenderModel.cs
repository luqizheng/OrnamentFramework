using Ornament.Messages.Dao;
using Ornament.Messages.Notification.Senders;

namespace Ornament.Messages.Plugin.Areas.Messages.Models
{
    public class ClientSenderModel
    {
        public ClientSenderModel()
        {
        }

        public ClientSenderModel(ClientSender sender)
        {
            Server = sender.Server;
            PrivateCode = sender.PrivateCode;
            this.ClientName = sender.ClientName;
        }

        public virtual string Server { get; set; }

        public virtual string PrivateCode { get; set; }

        public virtual string ClientName { get; set; }

        public Sender CreateSender(int? id, IMessageDaoFactory messageDaoFactory)
        {
            Sender sender = id != null
                ? messageDaoFactory.NotifySenderDao.Get(id.Value)
                : new ClientSender(Server);
            var clientSender = sender as ClientSender;
            Fill(clientSender);
            return sender;
        }

        public Sender Modify(int? id, IMessageDaoFactory messageDaoFactory)
        {
            Sender sender = messageDaoFactory.NotifySenderDao.Get(id.Value);
            var clientSender = sender as ClientSender;
            Fill(clientSender);
            return clientSender;
        }

        private void Fill(ClientSender clientSender)
        {
            if (clientSender != null)
            {
                clientSender.Server = Server;
                clientSender.PrivateCode = PrivateCode;
                clientSender.ClientName = this.ClientName;
            }
            else
            {
                throw new NotifySenderException("Can't change the SenderType to other");
            }

        }
    }
}