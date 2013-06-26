﻿using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.MemberShips
{
    public class MemberShipsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get { return "MemberShips"; }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            

            context.MapRoute(
                "MemberShips_default",
                "MemberShips/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
        }
    }
}