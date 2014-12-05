using System;
using System.Collections.Generic;
using Ornament.MemberShip;

namespace Ornament.Messages.Notification.Senders
{
    public class ClientSender : Sender
    {
        protected ClientSender()
        {
            
        }
        public override void Send(NotifyMessageTemplate template, IDictionary<string, string> varibale,
            User[] performers)
        {
            throw new NotImplementedException();
        }

        public virtual string Server { get; set; }
        
        public virtual string PrivateCode { get; set; }
        
    }
}