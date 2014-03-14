using System.Collections;
using System.Collections.Generic;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class UserGroupDetailInfor : UserGroupModel
    {
        public IList<User> Users { get; set; }

        public UserGroupDetailInfor()
        {
            
        }
        public UserGroupDetailInfor(UserGroup ug,IList<User> users)
            : base(ug)
        {
            Users = users;
        }
    }
}