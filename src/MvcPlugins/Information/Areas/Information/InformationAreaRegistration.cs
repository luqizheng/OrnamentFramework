using System.Web.Mvc;
using Ornament.Web.PortableAreas;

namespace Information.Areas.Information
{
    public class InformationAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Information";
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
