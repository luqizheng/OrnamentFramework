using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Dao.NHibernateImple;
using Ornament.Web;
using Ornament.Web.MessageHandlers;
using Ornament.Web.Messages;
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
            //初始化诗句
            bus.Send(new MessageInit());

            var helper = new AreaRegistrationHelper(this, "Ornament.Messages.Plugin", context);

            helper.RegistScripts("Scripts/News");
            helper.RegistScripts("Scripts/NewsType");
            helper.RegistScripts("Scripts/NotifyType");
            helper.RegistScripts("Scripts/Template");

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
                new { action = "Index", id = UrlParameter.Optional }
                );
            base.RegisterArea(context, bus);
        }

        protected override IEnumerable<NHRegisterEventMessage> RegistDaos()
        {
            return new[]
            {
                new NHRegisterEventMessage(typeof (IMessageDaoFactory), typeof (MessageDaoFactory))
            };
        }

    }
}