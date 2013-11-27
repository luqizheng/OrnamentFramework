﻿using System.Web.Mvc;
using MvcContrib.PortableAreas;

namespace Friends.Areas.Friends
{
    public class FriendsAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "Friends"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            base.RegisterArea(context, bus);
            context.MapRoute(
                "Friends_default",
                "Friends/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
        }
    }
}