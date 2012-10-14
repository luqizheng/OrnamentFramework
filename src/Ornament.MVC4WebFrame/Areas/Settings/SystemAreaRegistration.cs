using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Settings
{
    public class SystemAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get { return "Settings"; }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Settings_default",
                "Settings/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
                );
        }
    }
}