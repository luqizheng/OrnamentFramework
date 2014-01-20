using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Files.Plugin.Areas.Files.Controllers;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;

namespace Ornament.Files.Plugin.Areas.Files
{
    public class FilesAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "Files"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            context.MapRoute(
                AreaName + "_default",
                AreaRoutePrefix + "/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
            base.RegisterArea(context, bus);
        }

        protected override IEnumerable<NHRegisterEventMessage> RegistDaos()
        {
            return null;
        }

        protected override void GetInjectControllers(out IEnumerable<Type> controller,
            out IEnumerable<Type> apiController)
        {
            //支持给Controller的类型,避免Assembly全局扫描,加快第一次启动速度
            controller = new[]
            {
                typeof (FileController), typeof (ManagerController)
            };
            apiController = null;
        }
    }
}