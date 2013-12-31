using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Dao.NHibernateImple;
using Ornament.Web.Cfg;
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
            bus.Send(new DaoFactoryRegister(typeof(IMessageDaoFactory), typeof(MessageDaoFactory)));


            RegistyScripts("News", context);
            RegistyScripts("NewsType", context);
            RegistyScripts("NotifyType", context);
            RegistyScripts("Template", context);

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

        private void RegistyScripts(string scriptName, AreaRegistrationContext context)
        {
            //page scripts  regist
            context.MapRoute(
                AreaName + "_" + scriptName + "_scripts",
                string.Format("{0}/Scripts/{1}/{{resourceName}}", AreaRoutePrefix, scriptName),
                new
                    {
                        controller = "OrnamentEmbeddedResource",
                        action = "Index",
                        resourcePath = "Ornament.Messages.Plugin.Scripts." + scriptName,
                    }
                ,
                new[]
                    {
                        "Ornament.Web.Controllers"
                    }
                );
        }
    }
}