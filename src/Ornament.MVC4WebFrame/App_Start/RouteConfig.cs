using System.Security.Policy;
using System.Web.Mvc;
using System.Web.Routing;

namespace Ornament.MVCWebFrame.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //handler error
            routes.MapRoute(
                name: "404Notfound",
                url: "404/{action}/{id}",
                defaults: new { controller = "HttpError", action = "NotFound", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "fileManage",
                url: "connector",
                defaults: new { Controller = "Files", action = "Index", Area = "Settings", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}