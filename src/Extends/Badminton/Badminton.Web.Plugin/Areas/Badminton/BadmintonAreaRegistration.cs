using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Badminton.Dao;
using Badminton.Dao.NhImpl;
using Ornament.Web.MessageHandlers;
using Ornament.Web.PortableAreas;
using Ornament.Web.ProtableAreas.Messages;

namespace Badminton.Web.Plugin.Areas.Badminton
{
    public class BadmintonAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Badminton";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            base.RegisterArea(context, bus);
            context.MapRoute(AreaName + "_gymasium",
               this.AreaRoutePrefix + "/Yard/{action}/{gymasiumId}",
               new { action = "Index", gymasiumId = UrlParameter.Optional, Controller = "Yard" }
               );

            context.MapRoute(
                AreaName + "_default",
                AreaRoutePrefix + "/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }

        protected override IEnumerable<NHRegisterEventMessage> RegistDaos()
        {
            return new[]
            {
                new NHRegisterEventMessage(typeof (IBadmintonDaoFactory), typeof (BadmintonDaoFactory)),
            };
        }

        protected override void GetInjectControllers(out IEnumerable<Type> controller, out IEnumerable<Type> apiController)
        {
            throw new NotImplementedException();
        }
    }
}
