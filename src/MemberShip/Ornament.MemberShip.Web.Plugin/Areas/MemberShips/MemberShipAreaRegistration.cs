using System.Web.Http;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Plugin.Models.SampleData;
using Ornament.MemberShip.Web.Plugin.Models.SampleData;
using Ornament.Web;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;
using RouteParameter = System.Web.Http.RouteParameter;

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
            config.Routes.MapHttpRoute(AreaName + "Api", "api/memberships/{controller}/{action}", new
            {
                action = RouteParameter.Optional
            });
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            RegistApi();
            bus.Send(new NHRegisterEventMessage(typeof (IMemberShipFactory), typeof (MemberShipFactory)));

            //send the init data
            bus.Send(new MemberShipData());
            ResourceSetting.Registry();

            context.MapRoute(
                AreaName + "_images",
                AreaRoutePrefix + "/images/{resourceName}",
                new
                {
                    controller = "OrnamentEmbeddedResource",
                    action = "Index",
                    resourcePath = "images"
                },
                new[]
                {
                    "Ornament.Web.Controllers"
                }
                );

            //MemberShips/User/Edit/admin
            context.MapRoute(AreaName + "_EditUser",
                AreaName + "/User/Edit/{loginId}",
                new {action = "Edit", loginId = UrlParameter.Optional, controller = "User"}
                );


            context.MapRoute(
                AreaName + "_AssingUser",
                AreaName + "/User/Assign/{loginId}",
                new {action = "Assign", loginId = UrlParameter.Optional, controller = "User"},
                new[] {"Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers"}
                );

            context.MapRoute(
                AreaName + "_default",
                AreaName + "/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional},
                new[] {"Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers"}
                );


            var helper = new AreaRegistrationHelper(this, context);
            helper.RegistSeajsModule("Scripts/User");
            helper.RegistSeajsModule("Scripts/Org");
            helper.RegistSeajsModule("Scripts/Role");
            helper.RegistSeajsModule("Scripts/Share");
            helper.RegistSeajsModule("Scripts/Permissions");

            base.RegisterArea(context, bus);
        }
    }
}