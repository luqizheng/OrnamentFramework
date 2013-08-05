using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Badminton
{
    public class BadmintonAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Badminton";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute("gymasium",
                 "Badminton/Yard/{action}/{gymasiumId}",
                new { action = "Index", gymasiumId = UrlParameter.Optional, Controller = "Yard" }
                );

            context.MapRoute(
                "Badminton_default",
                "Badminton/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
