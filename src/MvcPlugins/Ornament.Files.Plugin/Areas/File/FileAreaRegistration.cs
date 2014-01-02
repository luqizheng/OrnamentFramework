using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Web.PortableAreas;

namespace Ornament.Files.Plugin.Areas.File
{
    public class FileAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Files";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            context.MapRoute(
              this.AreaName + "_default",
              this.AreaName + "/{controller}/{action}/{id}",
              new { action = "Index", id = UrlParameter.Optional }
          );
            base.RegisterArea(context, bus);
        }

        public override IEnumerable<DaoRegistryInformation> RegistDaos()
        {
            return null;
        }
    }
}
