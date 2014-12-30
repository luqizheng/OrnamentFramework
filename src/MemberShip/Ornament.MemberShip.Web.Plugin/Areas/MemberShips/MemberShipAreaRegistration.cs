﻿using System.Web.Http;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Web.Plugin.Models.SampleData;
using Ornament.Web;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;

namespace Ornament.MemberShip.Web.Plugin.Areas.MemberShips
{
    public class MemberShipAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "MemberShips"; }
        }

        private void RegistApi()
        {
            HttpConfiguration config = GlobalConfiguration.Configuration;

            //for users
            config.Routes.MapHttpRoute(AreaName + "_user_api", "api/memberships/users/{action}", new
            {
                controller = "Users"
            });


            config.Routes.MapHttpRoute(AreaName + "befix_Api", "api/memberships/{controller}/{id}", new
            {
                id = RouteParameter.Optional
            });
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            RegistApi();
            bus.Send(new NHRegisterEventMessage(typeof (IMemberShipDaoFactory), typeof (MemberShipDaoFactory)));

            //send the init data
            bus.Send(new MemberShipData());
            ResourceSetting.Registry();


            OrnamentContext.ResourceManager.Add(typeof(Role), typeof(RoleOperator));
            OrnamentContext.ResourceManager.Add(typeof(UserGroup), typeof(UserGroupOperator));

            OrnamentContext.ResourceManager.Add(ResourceSetting.UserGroup, typeof(UserGroupOperator));
            OrnamentContext.ResourceManager.Add(ResourceSetting.Role, typeof(RoleOperator));
            OrnamentContext.ResourceManager.Add(ResourceSetting.User, typeof(UserOperator));
            OrnamentContext.ResourceManager.Add(ResourceSetting.Permission, typeof(PermissionOperator));

            OrnamentContext.ResourceManager.Configuration().AddResourceSetting(new ResourceDescription
            {
                Name = "角色资源",
                Path = "~/Areas/MemberShips/Views/Shared/RoleListRadio.cshtml",
                ValueType = typeof(Role)
            });

            OrnamentContext.ResourceManager.Configuration().AddResourceSetting(new ResourceDescription
            {
                Name = "用户组资源",
                Path = "~/Areas/MemberShips/Views/Shared/UserGroupListRadio.cshtml",
                ValueType = typeof(UserGroup)
            });

            //MemberShips/User/Edit/admin
            context.MapRoute(AreaName + "_EditUser",
                AreaName + "/User/{action}/{loginId}",
                new {action = "Edit", loginId = UrlParameter.Optional, controller = "User"},
                new[] {"Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Controllers"}
                );

            context.MapRoute(
                AreaName + "_default",
                AreaName + "/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional},
                new[] {"Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Controllers"}
                );


            var helper = new AreaRegistrationHelper(this, context);
            helper.RegistyEmbedResouce("Scripts/Org/Templates");
            helper.RegistSeajsModule("Scripts/User");
            helper.RegistSeajsModule("Scripts/Org");
            helper.RegistSeajsModule("Scripts/Role");
            helper.RegistSeajsModule("Scripts/Share");
            helper.RegistSeajsModule("Scripts/Permissions");
            helper.RegistSeajsModule("Scripts/UserGroup");

            base.RegisterArea(context, bus);
        }
    }
}