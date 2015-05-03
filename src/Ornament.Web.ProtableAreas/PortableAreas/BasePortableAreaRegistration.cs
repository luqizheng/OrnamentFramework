using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace Ornament.Web.PortableAreas
{
    public class RegistedEmbedresourceEventArgs : EventArgs
    {
        public RegistedEmbedresourceEventArgs(IApplicationBus bus, AreaRegistrationContext context)
        {
            Bus = bus;
            Context = context;
        }

        public IApplicationBus Bus { get; set; }
        public AreaRegistrationContext Context { get; set; }
    }

    public abstract class BasePortableAreaRegistration : AreaRegistration
    {
        public static Action RegisterEmbeddedViewEngine = () => InputBuilder.InputBuilder.BootStrap();
        public static Action CheckAreasWebConfigExists = () => EnsureAreasWebConfigExists();
        private static readonly Dictionary<Assembly, int> ControllerCollection = new Dictionary<Assembly, int>();

        //public event EventHandler<RegistedEmbedresourceEventArgs> EmbedResourceRegisted;

        public virtual string AreaRoutePrefix
        {
            get { return AreaName; }
        }

        public virtual PortableAreaMap GetMap()
        {
            return null;
        }

        public virtual void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            //IEnumerable<Type> apiControllers;
            //IEnumerable<Type> controllers;
            //GetInjectControllers(out controllers, out apiControllers);
            //bus.Send(new IocControllerInjectMessageEvent(controllers, apiControllers));


            bus.Send(new PortableAreaStartupMessage(AreaName));

            RegisterAreaEmbeddedResources(bus, context);
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            RegisterArea(context, Bus.Instance);

            RegisterEmbeddedViewEngine();

            CheckAreasWebConfigExists();
        }

        public virtual void RegisterAreaEmbeddedResources(IApplicationBus bus, AreaRegistrationContext context)
        {
            Type areaType = GetType();
            var resourceStore = new AssemblyResourceStore(areaType, "/areas/" + AreaName.ToLower(), areaType.Namespace,
                GetMap());
            AssemblyResourceManager.RegisterAreaResources(resourceStore);
        }

        private static void EnsureAreasWebConfigExists()
        {
            string config = HttpContext.Current.Server.MapPath("~/areas/web.config");
            if (!File.Exists(config))
            {
                throw new Exception(
                    "Portable Areas require a ~/Areas/Web.config file in your host application. Copy the config from ~/views/web.config into a ~/Areas/ folder.");
            }
        }


       
    }
}