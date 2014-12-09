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
            this.Server = sender.Server;
            this.PrivateCode = sender.PrivateCode;
        }

        public virtual string Server { get; set; }

        public virtual string PrivateCode { get; set; }
    }
}