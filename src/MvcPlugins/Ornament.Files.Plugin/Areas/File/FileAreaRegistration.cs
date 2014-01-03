using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Files.Plugin.Areas.File.Controllers;
using Ornament.Web.MessageHandlers;
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

        protected override IEnumerable<NHRegisterEventMessage> RegistDaos()
        {
            return null;
        }

        protected override void GetInjectControllers(out IEnumerable<Type> controller, out IEnumerable<Type> apiController)
        {
            controller = new Type[]
            {
                typeof (FileController), typeof (ManagerController)
            };
            apiController = null;
        }
    }
}
