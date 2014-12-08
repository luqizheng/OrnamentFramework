using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Plugin.Areas.Messages.Models.Messages
{
    public class NotifyPublish
    {
        public User[] Users { get; set; }
        public UserGroup[] UserGroups { get; set; }
        public Org[] Orgs { get; set; }
        public NotifyMessageTemplate Template { get; set; }

        public ISet<User> AllUsers(IMemberShipDaoFactory memberShipDaoFactory)
        {
            var result = new HashSet<User>(Users);
            if (UserGroups != null)
            {
                foreach (UserGroup ug in UserGroups)
                {
                    foreach (User u in memberShipDaoFactory.CreateUserDao().GetUsers(ug))
                        result.Add(u);
                }
            }

            if (Orgs != null)
            {
                foreach (Org org in Orgs)
                {
                    foreach (User u in memberShipDaoFactory.CreateUserDao().GetUsers(org))
                    {
                        result.Add(u);
                    }
                }
            }

            return result;
        }

        public void Publish(IMemberShipDaoFactory memberShipDaoFactory, IDictionary<string, string> variable)
        {
            ISet<User> users = AllUsers(memberShipDaoFactory);

            Template.Send(memberShipDaoFactory, variable, users.ToArray());
        }
    }
}