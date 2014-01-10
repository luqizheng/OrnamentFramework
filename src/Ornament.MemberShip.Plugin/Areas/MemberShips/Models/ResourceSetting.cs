using Ornament.MemberShip.Plugin.Models;

namespace Ornament.MemberShip.Plugin.Areas.MemberShips.Models
{
    public static class ResourceSetting
    {
        public const string Role = "Role";

        public const string User = "User";

        public const string UserGroup = "UserGroup";
        public const string Org = "Org";


        public const string Account = "Account";
        public const string Permission = "Permission";


        public static void Registry()
        {
            OrnamentContext.ResourceManager
                .Add("User", typeof (UserOperator))
                .Add("Role", typeof (RoleOperator))
                .Add("Account", typeof (AccountOperator))
                .Add(Org, typeof (OrgOperator))
                .Add(UserGroup, typeof (UserGroupOperator))
                .Add("Permission", typeof (PermissionOperator))
                ;
        }
    }
}