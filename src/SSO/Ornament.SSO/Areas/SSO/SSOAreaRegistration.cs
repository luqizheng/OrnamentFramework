using System.Web.Mvc;
using Ornament.MemberShips.SSO.Dao;
using Ornament.SSO.Dao.NHImple;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;

namespace Ornament.SSO.Areas.SSO
{
    public class SSOAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "SSO"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            bus.Send(new NHRegisterEventMessage(typeof(ISSODaoFactory), typeof(SSODaoFactory)));
            context.MapRoute(
                "SSO_default",
                "SSO/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
                );
            base.RegisterArea(context, bus);
        }
    }
}