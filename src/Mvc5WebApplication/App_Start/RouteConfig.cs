using System.Web.Mvc;
using System.Web.Routing;

namespace WebApplication
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute("Requirejs", "scripts/config.js", new {controller = "Home", action = "config"}
                );
            routes.MapRoute("Default_culture", "{culture}/{controller}/{action}/{id}",
                new {controller = "Home", action = "Index", id = UrlParameter.Optional},
                new {culture = @"^[a-zA-Z]{2}(-[a-zA-Z]+)?$"}
                );
            routes.MapRoute("Default", "{controller}/{action}/{id}",
                new {culture = "en", controller = "Home", action = "Index", id = UrlParameter.Optional}
                );
        }
    }
}