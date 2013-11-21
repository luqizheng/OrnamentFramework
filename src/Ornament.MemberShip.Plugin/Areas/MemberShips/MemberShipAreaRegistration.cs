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
            //注册 Dao
            bus.Send(new DaoFactoryRegister(typeof (IMemberShipFactory), typeof (MemberShipFactory)));


            context.MapRoute(
                AreaName + "_scripts",
                AreaRoutePrefix + "/Scripts/User/{resourceName}",
                new
                    {
                        controller = "OrnamentEmbeddedResource",
                        action = "Index",
                        resourcePath = "Scripts.User",
                    }
                    ,
                    new string[]
                        {
                            "Ornament.Web.Controllers"
                        }
                    );

            context.MapRoute(
                AreaName + "_images",
                AreaRoutePrefix + "/images/{resourceName}",
                new
                    {
                        controller = "OrnamentEmbeddedResource", 
                        action = "Index", 
                        resourcePath = "images"
                    },
                    new string[]
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
                AreaName + "_default",
                AreaName + "/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional},
                new[] {"Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers"}
                );

            base.RegisterArea(context, bus);
        }
    }
}