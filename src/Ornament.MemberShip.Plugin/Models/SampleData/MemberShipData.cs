using System;
using System.Web.Security;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.Web.DataInitializers;

namespace Ornament.MemberShip.Plugin.Models.SampleData
{
    public class MemberShipData : IDataInitializer
    {
        public string AdminPassword { get; set; }

        #region IDataInitializer Members

        public string Name
        {
            get { return "Initialze Membership"; }
        }

        public bool IsNeedInitialize
        {
            get
            {
                User user = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().GetByLoginId("admin");
                return user == null;
            }
        }

        public void CreateData()
        {
            InitMemberShip();
        }

        #endregion

        private void InitMemberShip()
        {
            Permission userPermission = CreatePermission(ResourceSetting.User, "用户完全控制许可", "用户管理员,所有与用户有关的权限、分组、组织单元",
                UserOperator.Approve | UserOperator.Lock | UserOperator.Modify |
                UserOperator.Read | UserOperator.SetPassword |
                UserOperator.Delete |
                UserOperator.ReadPrivat);

            Permission rolePermission = CreatePermission(ResourceSetting.Role, "角色完全控制许可", "角色完全控制,包括分配，删除、新增操作",
                RoleOperator.Assign | RoleOperator.Modify | RoleOperator.Read);

            Permission memberPermission = CreatePermission(ResourceSetting.Account, "账户维护许可证", "用户管理自己本身信息的许可证",
                AccountOperator.ChangePassword |
                AccountOperator.ViewPermission |
                AccountOperator.ChangePrivateInfo);

            Permission permissionPermission = CreatePermission(ResourceSetting.Permission, "许可证完全控制", "许可证完全控制",
                PermissionOperator.Read | PermissionOperator.Delete |
                PermissionOperator.Edit);

            Permission orgPermission = CreatePermission(ResourceSetting.Org, "组织管理证书", "用户所在部门及下属部门都可以控制",
                OrgOperator.Delete);



            Role godRole = CreateRole(ResourceSetting.AdminRoleAccount, "管理员");
            godRole.Permissions.Add(rolePermission);
            godRole.Permissions.Add(userPermission);
            godRole.Permissions.Add(memberPermission);
            godRole.Permissions.Add(permissionPermission);
            godRole.Permissions.Add(orgPermission);

            OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao().SaveOrUpdate(godRole);

            UserGroup adminGroup = CreateOrGetUserGroup("admin group");
            adminGroup.Roles.Add(godRole);
            IUserGroupDao ugDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserGroupDao();
            ugDao.SaveOrUpdate(adminGroup);

            User adminUser = CreateUser(ResourceSetting.AdminRoleAccount, "123456", "admin@admin.com", "admin", "admin");
            adminUser.Roles.Add(godRole);
            adminUser.UserGroups.Add(adminGroup);
            OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().SaveOrUpdate(adminUser);
            OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().Flush();
        }

        private User CreateUser(string username, string password, string email
            , string question, string answord)
        {
            IUserDao userDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao();
            User user = userDao.GetByLoginId(username);
            if (user == null)
            {
                MembershipCreateStatus status;
                MembershipUser u = Membership.CreateUser(username, password, email, question,
                    answord, true, out status);
            }
            return userDao.GetByLoginId(username);
        }

        protected UserGroup CreateOrGetUserGroup(string name)
        {
            IUserGroupDao dao = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserGroupDao();
            UserGroup ug = dao.GetByName(name);
            if (ug != null)
            {
                return ug;
            }
            return new UserGroup(name);
        }

        protected Role CreateRole(string name, string remark)
        {
            IRoleDao roleDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao();

            Role role = roleDao.GetByName(name) ?? new Role(name) { Remarks = remark };
            roleDao.SaveOrUpdate(role);

            return role;
        }

        protected Org CreateOrg(string name, string remark, Org parent)
        {
            IOrgDao orgDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateOrgDao();
            Org org = orgDao.GetByName(name, parent) ?? new Org(name) { Remarks = remark };
            parent.Childs.Add(org);
            orgDao.SaveOrUpdate(org);
            return org;
        }

        protected Org CreateRootOrg(string name, string remark)
        {
            IOrgDao orgDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateOrgDao();
            Org org = orgDao.GetRootOrgBy(name) ?? new Org(name) { Remarks = remark };
            orgDao.SaveOrUpdate(org);
            return org;
        }

        protected Permission CreatePermission<T>(T resObj, string permisionName, string remark, Enum eEnum)
        {
            IPermissionDao dao = OrnamentContext.DaoFactory.MemberShipFactory.CreatePermissionDao();

            Permission permission = dao.GetPermission(permisionName) ?? new GenericPermission<T>(resObj)
            {
                Name = permisionName,
                Remark = remark,
                Operator = Convert.ToInt32(eEnum)
            };
            dao.SaveOrUpdate(permission);
            return permission;
        }
    }
}