using System.Web.Mvc;
using MvcContrib.PortableAreas;

namespace Information
{
    public class SystemAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "Settings"; }
        }
        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            context.MapRoute(
               this.AreaName + "_default",
               "Information/{controller}/{action}/{id}",
               new { action = "Index", id = UrlParameter.Optional }
               );
            base.RegisterArea(context, bus);
        }
    }
}
