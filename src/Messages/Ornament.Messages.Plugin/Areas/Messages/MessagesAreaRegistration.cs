using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Dao.NHibernateImple;
using Ornament.Web;
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
            bus.Send(new NHRegisterEventMessage(typeof (IMessageDaoFactory), typeof (MessageDaoFactory)));
            //初始化数据
            bus.Send(new MessageInit());

            OrnamentContext.ResourceManager.Add("Template", typeof (MessageOperator));

           

            RegistScripts("Scripts/News");
            RegistScripts("Scripts/NewsType");
            RegistScripts("Scripts/Template");
            RegistScripts("Scripts/Sender");
            RegistScripts("Scripts/Config");

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
    }
}