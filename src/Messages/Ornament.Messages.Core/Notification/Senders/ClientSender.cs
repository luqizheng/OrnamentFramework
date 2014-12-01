using System;
using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;

namespace Ornament.Messages.Notification.Senders
{
    public class ClientSender : Sender
    {
        public override void Send(NotifyMessageTemplate template, IDictionary<string, string> varibale, User[] performers)
        {
            throw new NotImplementedException();
        }
    }
}