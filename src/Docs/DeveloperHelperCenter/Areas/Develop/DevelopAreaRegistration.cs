using System.Web.Mvc;
using Ornament.Web;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;
using Ornament.Web.SeajsModules;

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
                new { action = "Index", id = UrlParameter.Optional }
                );
            var helper = new AreaRegistrationHelper(this, context);
            helper.RegistSeajsModule("/Scripts/Html");
            base.RegisterArea(context, bus);
        }
    }
}