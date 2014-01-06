using System.Web.Mvc;
using System.Web.Routing;

namespace Ornament.MVCWebFrame
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
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
 
        }
    }
}