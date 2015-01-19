using System;
using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Config;
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

        /// <summary>
        /// </summary>
        /// <param name="memberShipDaoFactory"></param>
        /// <param name="template"></param>
        /// <param name="varibale">输入的变量，会和NotifySenderManager中定义的全局变量合并</param>
        /// <param name="performers"></param>
        public virtual void Send(IMemberShipDaoFactory memberShipDaoFactory, NotifyMessageTemplate template,
            IDictionary<string, string> varibale,
            User[] performers)
        {
            if (memberShipDaoFactory == null) throw new ArgumentNullException("memberShipDaoFactory");
            if (template == null) throw new ArgumentNullException("template");
            var diect = new Dictionary<string, string>();

            foreach (var set in varibale)
            {
                if (!diect.ContainsKey(set.Key))
                    diect.Add(set.Key, set.Value);
                else
                {
                    diect[set.Key] = set.Value;
                }
            }
            NotifySenderManager.Instance.MergnGloablVariable(diect);
            var handler = new CreateVariablesHandler(user => diect);

            Send(memberShipDaoFactory, template, handler, performers, null);
        }

        /// <summary>
        /// </summary>
        /// <param name="memberShipDaoFactory"></param>
        /// <param name="template"></param>
        /// <param name="dynamicCreateVariablesHandler"></param>
        /// <param name="users"></param>
        /// <param name="performers"></param>
        public virtual void Send(IMemberShipDaoFactory memberShipDaoFactory, NotifyMessageTemplate template,
            CreateVariablesHandler dynamicCreateVariablesHandler,
            User[] users,
            IPerformer[] performers)
        {
            if (memberShipDaoFactory == null) throw new ArgumentNullException("memberShipDaoFactory");
            if ((users == null || users.Length == 0) && (performers == null || performers.Length == 0))
                throw new ArgumentOutOfRangeException("users", "users and performers cannot be empty in the same time.");

            HashSet<User> allUsers = users != null ? new HashSet<User>(users) : new HashSet<User>();
            if (performers != null)
            {
                foreach (IPerformer p in performers)
                {
                    foreach (User u in p.GetUsers(memberShipDaoFactory))
                    {
                        allUsers.Add(u);
                    }
                }
            }
            Queue<IDictionary<string, string>> userData = new Queue<IDictionary<string, string>>();
            foreach (var user in allUsers)
            {
                IDictionary<string, string> diect = dynamicCreateVariablesHandler(user);
                userData.Enqueue(diect);
            };

            Send(template, userData, users);
        }

        public abstract void Send(NotifyMessageTemplate template, Queue<IDictionary<string, string>> userDatas,
            User[] users);
    }
}