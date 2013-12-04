using System.Web.Mvc;
using MvcContrib.PortableAreas;

namespace Information.Areas.Setting
{
    public class SettingAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Setting";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            context.MapRoute(
                this.AreaName + "_default",
                this.AreaRoutePrefix + "/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
            base.RegisterArea(context, bus);
        }
    }
}
