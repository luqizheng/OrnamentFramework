using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Web.Plugin.Properties;


namespace Ornament.MemberShip.Web.Plugin.Models.Memberships
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
            ErrorMessageResourceType = typeof (Resources))]
        public override string Name { get; set; }

        public void Save(IRoleDao createRoleDao)
        {
            var role = new Role(Name)
            {
                Remarks = Remarks
            };
            createRoleDao.SaveOrUpdate(role);
        }
    }
}