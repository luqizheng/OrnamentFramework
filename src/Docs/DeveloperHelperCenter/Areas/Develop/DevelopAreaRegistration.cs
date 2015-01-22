using System.Web.Mvc;
using Ornament.Web.PortableAreas;

namespace DeveloperHelperCenter.Areas.Develop
{
    public class DevelopAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "Develop"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            context.MapRoute(
                "Develop_default",
                "Develop/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
            base.RegisterArea(context, bus);
        }
    }
}