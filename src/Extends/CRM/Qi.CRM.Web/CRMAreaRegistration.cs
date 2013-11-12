using System.Web.Mvc;
using MvcContrib.PortableAreas;

namespace Qi.CRM.Web
{
    public class CRMAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "CRM"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            bus.Send(new EventMessage());
            base.RegisterArea(context, bus);
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "CRM_default",
                "CRM/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
        }
    }

    public class EventMessage : IEventMessage
    {
        public override string ToString()
        {
            return "CRM_Modules is installing.";
        }
    }
}