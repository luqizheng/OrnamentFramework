using System.Collections.Generic;
using Ornament.MemberShip.Plugin.Models.Memberships;

namespace Ornament.MemberShip.Plugin.Areas.MemberShips.Models
{
    public class OrgDetailsModel : OrgModel
    {
        public OrgDetailsModel()
        {
        }

        public OrgDetailsModel(Org org, IList<User> users)
            : base(org)
        {
            Users = users;
        }

        public IList<User> Users { get; set; }
    }
}