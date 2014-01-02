using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Dao.NHibernateImple;
using Ornament.Web.PortableAreas;

namespace Ornament.Messages.Plugin.Areas.Messages
{
    public class MessagesAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "Messages"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            //注册 Dao
            var helper = new MessagesAreaRegistrationHelper(this);

            helper.RegistyScripts("News", context);
            helper.RegistyScripts("NewsType", context);
            helper.RegistyScripts("NotifyType", context);
            helper.RegistyScripts("Template", context);

            context.MapRoute(
                AreaName + "_images",
                AreaRoutePrefix + "/images/{resourceName}",
                new
                {
                    controller = "OrnamentEmbeddedResource",
                    action = "Index",
                    resourcePath = "images"
                },
                new[]
                {
                    "Ornament.Web.Controllers"
                }
                );
            context.MapRoute(
                AreaName + "_default",
                AreaRoutePrefix + "/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
            base.RegisterArea(context, bus);
        }

        public override IEnumerable<DaoRegistryInformation> RegistDaos()
        {
            return new[]
            {
                new DaoRegistryInformation(typeof (IMessageDaoFactory), typeof (MessageDaoFactory))
            };
        }
    }
}