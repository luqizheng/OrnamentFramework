﻿using System.Web.Mvc;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class RoleModel : Role
    {
      

        public RoleModel()
        {
        }

        public RoleModel(Role role)
        {
            Name = role.Name;
            foreach (Permission p in role.Permissions)
            {
                Permissions.Add(p);
            }

            Remarks = role.Remarks;
        }
         [Remote("NotDuplicate", "Role", "MemberShips", 
             AdditionalFields = "Id",
            ErrorMessageResourceName = "alertMsg_duplicate_roleName",
            ErrorMessageResourceType = typeof(Properties.Resources))]
        public override string Name { get; set; }
    }
}