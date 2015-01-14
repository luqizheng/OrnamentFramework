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
        }

        public virtual string Server { get; set; }

        public virtual string PrivateCode { get; set; }

        public Sender CreateSender(int? id, IMessageDaoFactory messageDaoFactory)
        {
            Sender sender = id != null
                ? messageDaoFactory.NotifySenderDao.Get(id.Value)
                : new ClientSender(Server);
            var clientSender = sender as ClientSender;
            if (clientSender != null)
            {
                clientSender.Server = Server;
                clientSender.PrivateCode = PrivateCode;
            }
            else
            {
                throw new NotifySenderException("Can't change the SenderType to other");
            }
            return sender;
        }

        public Sender Modify(int? id, IMessageDaoFactory messageDaoFactory)
        {
            Sender sender = messageDaoFactory.NotifySenderDao.Get(id.Value);
            var clientSender = sender as ClientSender;
            if (clientSender != null)
            {
                clientSender.Server = Server;
                clientSender.PrivateCode = PrivateCode;
            }
            return clientSender;
        }
    }
}