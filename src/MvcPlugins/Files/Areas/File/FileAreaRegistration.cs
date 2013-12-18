using System.Web.Mvc;
using MvcContrib.PortableAreas;

namespace Files.Areas.File
{
    public class FileAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "File";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            base.RegisterArea(context, bus);
            context.MapRoute(
              this.AreaName + "_default",
              this.AreaName + "/{controller}/{action}/{id}",
              new { action = "Index", id = UrlParameter.Optional }
          );
        }
    }
}
