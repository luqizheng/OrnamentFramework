using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;

namespace Ornament.Messages.Notification.Senders
{
    public abstract class Sender : ISender
    {
        /// <summary>
        /// </summary>
        /// <param name="senderName"></param>
        /// <param name="memberShipFactory"></param>
        /// <param name="messageDaoFactory"></param>
        protected Sender(string senderName, IMemberShipFactory memberShipFactory, IMessageDaoFactory messageDaoFactory)
        {
            Name = senderName;
            MemberShipFactory = memberShipFactory;
            MessageDaoFactory = messageDaoFactory;
        }

        public string Name { get; set; }
        public string Remarks { get; set; }
        public IMemberShipFactory MemberShipFactory { get; set; }
        public IMessageDaoFactory MessageDaoFactory { get; set; }


        public void Send(NotifyMessageTemplate template, IPerformer[] performers)
        {
            var targetuser = new HashSet<User>();
            foreach (IPerformer performer in performers)
            {
                foreach (User user in performer.GetUsers(MemberShipFactory))
                    targetuser.Add(user);
            }

            Send(template, targetuser.ToArray());
        }

        protected abstract void Send(NotifyMessageTemplate template, User[] performers);
    }
}