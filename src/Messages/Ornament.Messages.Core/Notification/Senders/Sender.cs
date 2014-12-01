using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.Messages.Notification.Senders
{
    public abstract class Sender : ISender
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
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        public string Remarks { get; set; }


        /// <summary>
        /// </summary>
        /// <param name="template"></param>
        /// <param name="memberShipFactory"></param>
        /// <param name="variable"></param>
        /// <param name="performers"></param>
        public void Send(NotifyMessageTemplate template, IMemberShipFactory memberShipFactory,
            IDictionary<string, string> variable, IPerformer[] performers)
        {
            var targetuser = new HashSet<User>();
            foreach (IPerformer performer in performers)
            {
                foreach (User user in performer.GetUsers(memberShipFactory))
                    targetuser.Add(user);
            }

            Send(template, variable, targetuser.ToArray());
        }

        public abstract void Send(NotifyMessageTemplate template, IDictionary<string, string> varibale, User[] performers);




    }
}