using System;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.Messages.Notification.Senders
{
    public class ClientSender : Sender
    {
        protected ClientSender()
        {
        }

        public ClientSender(string server)
        {
            Server = server;
        }


        public virtual string Server { get; set; }

        public virtual string PrivateCode { get; set; }

        public override void Send(IMemberShipDaoFactory memberShipDaoFactory, NotifyMessageTemplate template,
            CreateVariablesHandler dynamicCreateVariablesHandler, User[] user, IPerformer[] performers)
        {
            throw new NotImplementedException();
        }
    }
}