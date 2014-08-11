using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Plugin.Models.SampleData;
using Ornament.Web.DataInitializers;

namespace Ornament.MemberShip.Web.Plugin.Models.SampleData
{
    public class MemberShipData : MemberShipDataInitializer, IDataInitializer
    {
        public string AdminPassword { get; set; }

        #region IDataInitializer Members

        public override Permission[] Permissions
        {
            get
            {
                return new Permission[]
                {
                    //new GenericPermission<string>(ResourceSetting.User)
                    //{
                    //    Name = "用户管理员许可",
                    //    Remark = "用户管理员,所有与用户有关的权限、分组、组织单元",
                    //    Operator = Convert.ToInt32(GetAll<UserOperator>())
                    //}
                };
            }
        }

        public override string Name
        {
            get { return "Initialze Membership"; }
        }

        public override bool IsNeedInitialize
        {
            get { return true; }
        }

        public override void CreateData()
        {
            InitMemberShip();
        }

        #endregion

        private void InitMemberShip()
        {
            Permission userPermission = MemberShipDataInitializer.CreatePermission(ResourceSetting.User, "用户管理员许可",
                "用户管理员,所有与用户有关的权限、分组、组织单元",
                UserOperator.Approve | UserOperator.Lock | UserOperator.Modify |
                UserOperator.Read | UserOperator.SetPassword |
                UserOperator.Delete |
                UserOperator.ReadPrivat);

            Permission rolePermission = MemberShipDataInitializer.CreatePermission(ResourceSetting.Role, "角色管理员许可",
                "角色完全控制,包括分配，删除、新增操作",
                RoleOperator.Assign | RoleOperator.Modify | RoleOperator.Read);

            Permission memberPermission = MemberShipDataInitializer.CreatePermission(ResourceSetting.Account, "账户管理员可证",
                "用户管理自己本身信息的许可证",
                AccountOperator.ChangePassword |
                AccountOperator.ViewPermission |
                AccountOperator.ChangePrivateInfo);

            Permission permissionPermission = MemberShipDataInitializer.CreatePermission(ResourceSetting.Permission,
                "许可证管理员", "许可证完全控制",
                PermissionOperator.Read | PermissionOperator.Delete |
                PermissionOperator.Edit);

            Permission orgPermission = MemberShipDataInitializer.CreatePermission(ResourceSetting.Org, "组织管理许可",
                "用户所在部门及下属部门都可以控制",
                OrgOperator.Delete);


            Role godRole = CreateRole(ResourceSetting.AdminRoleAccount, "管理员");
            godRole.Permissions.Add(rolePermission);
            godRole.Permissions.Add(userPermission);
            godRole.Permissions.Add(memberPermission);
            godRole.Permissions.Add(permissionPermission);
            godRole.Permissions.Add(orgPermission);

            OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao().SaveOrUpdate(godRole);

            UserGroup adminGroup = CreateUserGroup("admin group");
            adminGroup.Roles.Add(godRole);

            IUserGroupDao ugDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserGroupDao();
            ugDao.SaveOrUpdate(adminGroup);

            User adminUser = CreateUser(ResourceSetting.AdminRoleAccount, "123456", "admin@admin.com", "admin", "admin");
            adminUser.Roles.Add(godRole);
            adminUser.UserGroups.Add(adminGroup);
            OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().SaveOrUpdate(adminUser);
            OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().Flush();
            //组织管理员
            IRoleDao roleDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao();
            Role orgRole = CreateRole(ResourceSetting.Org, "组织单元管理员");
            orgRole.Permissions.Add(orgPermission);
            roleDao.SaveOrUpdate(orgRole);
        }
    }
}