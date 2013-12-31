﻿using System.Web.Mvc;
using Ornament.Web.PortableAreas;

namespace Badminton.Web.Plugin.Areas.Badminton
{
    public class BadmintonAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Badminton";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            base.RegisterArea(context, bus);
            context.MapRoute(AreaName + "_gymasium",
               this.AreaRoutePrefix + "/Yard/{action}/{gymasiumId}",
               new { action = "Index", gymasiumId = UrlParameter.Optional, Controller = "Yard" }
               );

            context.MapRoute(
                AreaName + "_default",
                AreaRoutePrefix + "/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
