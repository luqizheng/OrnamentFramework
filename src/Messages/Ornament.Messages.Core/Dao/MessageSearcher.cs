using System.Collections.Generic;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.Messages.Dao
{
    public class MessageSearcher
    {
        private IList<IPerformer> _performers;
        

        public MessageSearcher()
        {
            PageSize = 40;
            PageIndex = 0;
        }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public ReadStatus? ReadStatus { get; set; }

        public MessageState? MessageState { get; set; }

        public User RelivateUser { get; set; }

        public IList<IPerformer> Performers
        {
            get { return _performers ?? (_performers = new List<IPerformer>()); }
        }

        public string[] TypeNames
        {
            get;
            set;
        }

        public void GetPerformers(out Iesi.Collections.Generic.ISet<User> users,
            out Iesi.Collections.Generic.ISet<Role> roles,
            out Iesi.Collections.Generic.ISet<UserGroup> ugs)
        {
            users = new HashedSet<User>();
          
            roles = new HashedSet<Role>();
            ugs = new HashedSet<UserGroup>();


            if (RelivateUser != null)
            {
                users.Add(RelivateUser);
                roles.AddAll(RelivateUser.GetAllRoles().ToArray());
                ugs.AddAll(RelivateUser.GetUserGroups().ToArray());
            }

            if (_performers != null)
            {
                foreach (var p in _performers)
                {
                    if (p is Role)
                    {
                        roles.Add((Role)p);
                    }
                    else if (p is User)
                    {
                        users.Add((User)p);
                    }
                    else if (p is UserGroup)
                    {
                        ugs.Add((UserGroup)p);
                    }
                  
                }

            }
        }

        public int GetFirstResult()
        {
            return PageSize * PageIndex;
        }
    }
}