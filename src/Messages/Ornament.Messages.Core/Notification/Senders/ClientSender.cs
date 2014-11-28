using System;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;

namespace Ornament.Messages.Notification.Senders
{
    public class ClientSender : Sender
    {
        public ClientSender(string name, IMemberShipFactory memberShipFactory, IMessageDaoFactory messageDaoFactory)
            : base(name, memberShipFactory, messageDaoFactory)
        {
        }

        protected override void Send(NotifyMessageTemplate template, User[] performers)
        {
            throw new NotImplementedException();
        }
    }
}