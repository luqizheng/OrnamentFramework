using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Projects
{
    public class ProjectsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Projects";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Projects_default",
                "Projects/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
            context.MapRoute(
                "Projects_product",
                "Projects/{controller}/{product}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
        }
    }
}
