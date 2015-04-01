using System.Web.Mvc;
using Ornament.Web.PortableAreas;

namespace Ornament.ProductorOrder.Web.Plugin.Areas.Orders
{
    public class OrdersAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Orders";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            context.MapRoute(
                "Orders_default",
                "Orders/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );

            base.RegisterArea(context, bus);
        }
    }
}