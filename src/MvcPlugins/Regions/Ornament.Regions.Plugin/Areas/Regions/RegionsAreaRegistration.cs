using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Regions.Dao;
using Ornament.Regions.Dao.NHibernateImple;
using Ornament.Regions.Plugin.Models;
using Ornament.Web;
using Ornament.Web.MessageHandlers;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;

namespace Ornament.Regions.Plugin.Areas.Regions
{
    public class RegionsAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "Regions"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            bus.Send(new DataInit());
            var helper = new AreaRegistrationHelper(this, "Ornament.Regions.Plugin", context);
            helper.RegistySeajsModule("Scripts");
            context.MapRoute(
                AreaName + "_default",
                AreaRoutePrefix + "/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
                );

            base.RegisterArea(context, bus);
        }

        protected override IEnumerable<NHRegisterEventMessage> RegistDaos()
        {
            return new[]
            {
                new NHRegisterEventMessage(typeof (IRegionDaoFactory), typeof (RegionDaoFactory))
            };
        }


    }
}