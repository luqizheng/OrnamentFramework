using System.Web.Mvc;
using MvcContrib.PortableAreas;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.Web.Cfg;

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
            base.RegisterArea(context, bus);

            //注册 Dao
            bus.Send(new DaoFactoryRegister(typeof (IMemberShipFactory), typeof (MemberShipFactory)));


            context.MapRoute(
                AreaName + "_scripts",
                base.AreaRoutePrefix + "/Scripts/{resourceName}",
                new {controller = "EmbeddedResource", action = "Index", resourcePath = "scripts"},
                new[] {"Ornament.MemberShip.Plugin.Areas.MemberShips"}
                );

            context.MapRoute(
                AreaName + "_images",
                base.AreaRoutePrefix + "/images/{resourceName}",
                new {controller = "EmbeddedResource", action = "Index", resourcePath = "images"},
                new[] { "Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers" }
                );

            context.MapRoute(AreaName + "_EditUser",
                //MemberShips/User/Edit/admin
                AreaName + "/User/Edit/{loginId}",
                new {action = "Edit", loginId = UrlParameter.Optional, controller = "User"},
                new[] { "Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers" }
                );

            context.MapRoute(
                AreaName + "_default",
                AreaName + "/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional},
                new[] { "Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers" }
                );
        }
    }
}