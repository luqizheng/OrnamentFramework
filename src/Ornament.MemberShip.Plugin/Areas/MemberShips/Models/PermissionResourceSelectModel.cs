﻿using Ornament.MemberShip.Permissions;
using Ornament.Web;

namespace Ornament.MemberShip.Plugin.Areas.MemberShips.Models
{
    public class PermissionResourceSelectModel
    {
        public ResourceDescription Description { get; set; }
        public Permission Permission { get; set; }
    }
}