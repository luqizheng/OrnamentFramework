using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Qi.Domain;

namespace Ornament.Messages.Notification.Senders
{
    public abstract class Sender : DomainObject<Sender, int>
    {
        protected Sender()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="senderName"></param>
        protected Sender(string senderName)
        {
            Name = senderName;
        }

        /// <summary>
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Remarks { get; set; }


        public virtual void Send(IMemberShipDaoFactory memberShipDaoFactory, NotifyMessageTemplate template,
            IDictionary<string, string> varibale,
            User[] performers)
        {
            var handler = new CreateVariablesHandler(user => varibale);

            Send(memberShipDaoFactory, template, handler, performers, null);
        }

        public abstract void Send(IMemberShipDaoFactory memberShipDaoFactory, NotifyMessageTemplate template,
            CreateVariablesHandler dynamicCreateVariablesHandler,
            User[] user,
            IPerformer[] performers);
    }
}