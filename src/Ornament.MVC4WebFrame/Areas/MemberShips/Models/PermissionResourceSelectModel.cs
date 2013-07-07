using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ornament.MemberShip.Permissions;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Models
{
    public class PermissionResourceSelectModel
    {
        public PermissionResourceSelectModel()
        {
            
        }
        public ResourceDescription Description { get; set; }
        public Permission Permission { get; set; }
    }
}