using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.Web.PortableAreas;

namespace Ornament.MemberShip.Plugin.Areas.MemberShips
{
    public class MemberShipAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "MemberShips"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            var helper = new MessagesAreaRegistrationHelper(this);


            helper.RegistyScripts("User", context);
            helper.RegistyScripts("Share", context);
            helper.RegistyScripts("Permissions", context);

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

            base.RegisterArea(context, bus);
        }

        public override IEnumerable<DaoRegistryInformation> RegistDaos()
        {
            return new[]
            {
                new DaoRegistryInformation(typeof (IMemberShipFactory), typeof (MemberShipFactory))
            };
        }
    }
}