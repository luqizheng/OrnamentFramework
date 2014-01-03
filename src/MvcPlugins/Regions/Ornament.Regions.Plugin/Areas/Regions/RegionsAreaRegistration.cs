using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Regions.Dao;
using Ornament.Regions.Dao.NHibernateImple;
using Ornament.Web.MessageHandlers;
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
            context.MapRoute(
                this.AreaName+"_default",
                this.AreaRoutePrefix+"/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
        }

        public override IEnumerable<NHRegisterEventMessage> RegistDaos()
        {
            return new[]
            {
                new NHRegisterEventMessage(typeof (IRegionDaoFactory), typeof (RegionDaoFactory)),
            };
        }
    }
}