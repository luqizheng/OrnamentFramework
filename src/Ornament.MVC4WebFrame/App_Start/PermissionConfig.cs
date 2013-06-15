using Ornament.MVCWebFrame.Models.Membership;
using Ornament.Messages;
using Ornament.Messages.Newses;
using Ornament.Web;

namespace Ornament.MVCWebFrame.App_Start
{
    public class PermissionConfig
    {
        public static void Regist()
        {
            OrnamentContext.ResourceManager
                           .Add("User", typeof (UserOperator))
                           .Add("Role", typeof (RoleOperator))
                           .Add("Account", typeof (AccountOperator))
                           .Add("Org", typeof (OrgOperator))
                           .Add("UserGroup", typeof (UserGroupOperator));
            RegistrySettingPage();
        }

        private static void RegistrySettingPage()
        {
            OrnamentContext.ResourceManager.Configuration().ResourceSettings.Add(new ResourceDescription
                {
                    ValueType = typeof (string),
                    Name = "类型资源",
                    Path = " /Areas/MemberShips/Views/Permissions/DefaultResourceSelector.cshtml"
                });

            OrnamentContext.ResourceManager.Configuration().ResourceSettings.Add(new ResourceDescription
                {
                    Name = "信息资源",
                    Path = "/Areas/Infos/Views/Shared/InfoTypeChoice.cshtml",
                    ValueType = typeof (NewsType)
                });
        }
    }
}