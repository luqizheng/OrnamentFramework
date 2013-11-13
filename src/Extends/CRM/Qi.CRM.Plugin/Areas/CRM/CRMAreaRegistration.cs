using System.Web.Mvc;

namespace Qi.CRM.Plugin.Areas.CRM
{
    public class CRMAreaRegistration : MvcContrib.PortableAreas.PortableAreaRegistration

    {
        public override string AreaName
        {
            get
            {
                return "CRM";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context, MvcContrib.PortableAreas.IApplicationBus bus)
        {
            base.RegisterArea(context, bus);
            
            context.MapRoute(
                AreaName + "_scripts",
                base.AreaRoutePrefix + "/Scripts/{resourceName}",
                new { controller = "EmbeddedResource", action = "Index", resourcePath = "scripts" },
                new[] { "Qi.CRM.Plugin" }
            );

            context.MapRoute(
                AreaName + "_images",
                base.AreaRoutePrefix + "/images/{resourceName}",
                new { controller = "EmbeddedResource", action = "Index", resourcePath = "images" },
                new[] { "Qi.CRM.Plugin" }
            );

            context.MapRoute(
                AreaName + "_default",
                base.AreaRoutePrefix + "/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                new[] { "Qi.CRM.Plugin.Areas.CRM.Controllers", "MvcContrib" }
            );
        }

        /*public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "CRM_default",
                "CRM/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }*/
    }
}
