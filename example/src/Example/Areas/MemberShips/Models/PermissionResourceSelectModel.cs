using Ornament.MemberShip.Permissions;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Models
{
    public class PermissionResourceSelectModel
    {
        public ResourceDescription Description { get; set; }
        public Permission Permission { get; set; }
    }
}