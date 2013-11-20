using System.Web.Mvc;
using MvcContrib.PortableAreas;

namespace Ornament.MemberShip.Plugin.Areas.MemberShip
{
    public class MemberShipAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "MemberShip"; }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(AreaName + "_EditUser",
                             "MemberShips/{controller}/{action}/{loginId}",
                             new {action = "Edit", loginId = UrlParameter.Optional}
                );

            context.MapRoute(
                AreaName + "_default",
                AreaName + "/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
        }
    }
}