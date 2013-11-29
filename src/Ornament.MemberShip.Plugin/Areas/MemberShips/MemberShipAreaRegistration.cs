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
            bus.Send(new DaoFactoryRegister(typeof(IMemberShipFactory), typeof(MemberShipFactory)));
            RegistyScripts("User", context);
            RegistyScripts("Combine", context);
            RegistyScripts("Permissions", context);

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
                             new { action = "Edit", loginId = UrlParameter.Optional, controller = "User" }
                );


            context.MapRoute(
                AreaName + "_AssingUser",
                AreaName + "/User/Assign/{loginId}",
                new { action = "Assign", loginId = UrlParameter.Optional, controller = "User" },
                new[] { "Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers" }
                );

            context.MapRoute(
                AreaName + "_default",
                AreaName + "/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                new[] { "Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers" }
                );

            base.RegisterArea(context, bus);
        }

        private void RegistyScripts(string scriptName, AreaRegistrationContext context)
        {
            //page scripts  regist
            context.MapRoute(
                AreaName + "_" + scriptName + "_scripts",
                string.Format("{0}/Scripts/{1}/{{resourceName}}", AreaRoutePrefix, scriptName),
                new
                {
                    controller = "OrnamentEmbeddedResource",
                    action = "Index",
                    resourcePath = "Ornament.MemberShip.Plugin.Scripts." + scriptName,
                }
                ,
                new[]
                    {
                        "Ornament.Web.Controllers"
                    }
                );
        }
    }
}