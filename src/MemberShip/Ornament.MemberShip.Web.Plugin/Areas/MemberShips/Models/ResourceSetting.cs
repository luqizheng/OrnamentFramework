using Ornament.MemberShip.Plugin.Models;

namespace Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Models
{
    public static class ResourceSetting
    {
        /// <summary>
        /// 角色资源
        /// </summary>
        public const string Role = "Role";
        /// <summary>
        /// 用户资源
        /// </summary>
        public const string User = "User";
        /// <summary>
        /// 用户分
        /// </summary>
        public const string UserGroup = "UserGroup";
        /// <summary>
        /// 组织单元
        /// </summary>
        public const string Org = "Org";

        /// <summary>
        /// 账号资源
        /// </summary>
        public const string Account = "Account";
        /// <summary>
        /// 资源名称 许可证
        /// </summary>
        public const string Permission = "Permission";
        /// <summary>
        /// 系统管理员角色
        /// </summary>
        public const string AdminRoleAccount = "admin";
        /// <summary>
        /// 系统管理员，这个管理员会跳过所有权限检查，危险
        /// </summary>
        public const string AdminAccount = "admin";

        public static void Registry()
        {
            OrnamentContext.ResourceManager
                .Add(User, typeof(UserOperator))
                .Add(Role, typeof(RoleOperator))
                .Add(Account, typeof(AccountOperator))
                .Add(Org, typeof(OrgOperator))
                .Add(UserGroup, typeof(UserGroupOperator))
                .Add(Permission, typeof(PermissionOperator))
                .Add(typeof(Role), typeof(RoleOperator));
        }
    }
}