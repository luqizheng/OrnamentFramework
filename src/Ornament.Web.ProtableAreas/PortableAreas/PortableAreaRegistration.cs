using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using Ornament.Web.Messages;

namespace Ornament.Web.PortableAreas
{
    public class RegistedEmbedresourceEventArgs : EventArgs
    {
        public IApplicationBus Bus { get; set; }

        public RegistedEmbedresourceEventArgs(IApplicationBus bus)
        {
            Bus = bus;
        }
    }
    public abstract class PortableAreaRegistration : AreaRegistration
    {
        public static Action RegisterEmbeddedViewEngine = () => InputBuilder.InputBuilder.BootStrap();
        public static Action CheckAreasWebConfigExists = () => EnsureAreasWebConfigExists();
        private static readonly Dictionary<Assembly, int> ControllerCollection = new Dictionary<Assembly, int>();

        public event EventHandler<RegistedEmbedresourceEventArgs> EmbedResourceRegisted;

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
            IEnumerable<Type> apiControllers;
            IEnumerable<Type> controllers;
            GetInjectControllers(out controllers, out apiControllers);
            bus.Send(new IocControllerInjectMessageEvent(controllers, apiControllers));


            bus.Send(new PortableAreaStartupMessage(AreaName));

            RegisterAreaEmbeddedResources(bus);

        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            RegisterArea(context, Bus.Instance);

            RegisterEmbeddedViewEngine();

            CheckAreasWebConfigExists();
        }

        public void RegisterAreaEmbeddedResources(IApplicationBus bus)
        {
            Type areaType = GetType();
            var resourceStore = new AssemblyResourceStore(areaType, "/areas/" + AreaName.ToLower(), areaType.Namespace,
                GetMap());
            AssemblyResourceManager.RegisterAreaResources(resourceStore);

            if (EmbedResourceRegisted != null)
            {
                EmbedResourceRegisted(this, new RegistedEmbedresourceEventArgs(bus));
            }
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




        protected virtual void GetInjectControllers(out IEnumerable<Type> controller,
            out IEnumerable<Type> apiController)
        {
            //���һ��Assembly(Plugin)�����ж��Area�������Ͳ����ظ�ע��Cotnroller����Ϣ��
            Assembly assembly = GetType().Assembly;
            if (!ControllerCollection.ContainsKey(assembly))
            {
                AssemblyHelper.FindController(GetType().Assembly, out controller, out apiController);
                ControllerCollection.Add(assembly, 0);
                return;
            }
            apiController = null;
            controller = null;
        }
    }
}