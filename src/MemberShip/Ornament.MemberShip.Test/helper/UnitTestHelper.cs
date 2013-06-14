using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.NHibernates;

namespace MemberShip.Test.helper
{
    public static class UnitTestHelper
    {
        public const string Permission = "Ornament_MemberShip_Permission";
        public const string RoleTable = "Ornament_MemberShip_Role";
        public const string TypePermission = "Ornament_MemberShip_TypePermission";
        public const string UserRoleRelation = "Ornament_MemberShip_UserRoleRelation";
        public const string UserTable = "Ornament_MemberShip_User";
        public const string PermissionRoleRelation = "Ornament_MemberShip_PermissionRoleRelation";
        public const string ResourceTable = "Ornament_MemberShip_ResourceInfo";

        public static bool _init;
       

        public static void Init()
        {
            if (!_init)
            {
                _init = true;
                SessionManager.Instance.UpdateSchema();

            }
        }


        internal static IDriver EasyDriver()
        {
            return new NHDriver(SessionManager.Instance.GetSessionFactory());
        }
    }
}