using System;
using System.Web.Security;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.Web.DataInitializers;
using Ornament.Web.Models;

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

            Role adminRole = CreateRole("admin", "管理员");
            adminRole.Permissions.Add(rolePermission);
            adminRole.Permissions.Add(userPermission);
            adminRole.Permissions.Add(memberPermission);
            adminRole.Permissions.Add(permissionPermission);
            OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao().SaveOrUpdate(adminRole);

            UserGroup adminGroup = CreateOrGetUserGroup("admin group");
            adminGroup.Roles.Add(adminRole);
            IUserGroupDao ugDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserGroupDao();
            ugDao.SaveOrUpdate(adminGroup);

            User adminUser = CreateUser("admin", AdminPassword, "admin@admin.com", "admin", "123456");
            adminUser.Roles.Add(adminRole);
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
                MembershipUser u = System.Web.Security.Membership.CreateUser(username, password, email, question,
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

            Role role = roleDao.GetByName(name) ?? new Role(name) { Remark = remark };
            roleDao.SaveOrUpdate(role);

            return role;
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