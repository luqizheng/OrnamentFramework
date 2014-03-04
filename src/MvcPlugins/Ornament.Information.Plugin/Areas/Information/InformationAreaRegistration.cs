using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;

namespace Ornament.Information.Plugin.Areas.Information
{
    public class InformationAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "Information"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            context.MapRoute(
                AreaName + "_default",
                AreaRoutePrefix + "/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
            base.RegisterArea(context, bus);
        }

       

     
    }
}