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
            context.MapRoute(
                "Badminton_default",
                "Badminton/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
