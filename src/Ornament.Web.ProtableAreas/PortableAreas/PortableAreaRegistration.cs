using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using Ornament.Web.Messages;

namespace Ornament.Web.PortableAreas
{
    public abstract class PortableAreaRegistration : AreaRegistration
    {
        public static Action RegisterEmbeddedViewEngine = () => InputBuilder.InputBuilder.BootStrap();
        public static Action CheckAreasWebConfigExists = () => EnsureAreasWebConfigExists();

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
            IEnumerable<NHRegisterEventMessage> ite = RegistDaos();
            if (ite != null)
            {
                foreach (NHRegisterEventMessage imple in ite)
                {
                    bus.Send(imple);
                }
            }
            IEnumerable<Type> apiControllers;
            IEnumerable<Type> controllers;
            GetInjectControllers(out controllers, out apiControllers);
            bus.Send(new IocControllerInjectMessageEvent(controllers, apiControllers));


            bus.Send(new PortableAreaStartupMessage(AreaName));

            RegisterAreaEmbeddedResources();
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            RegisterArea(context, Bus.Instance);

            RegisterEmbeddedViewEngine();

            CheckAreasWebConfigExists();
        }

        public void RegisterAreaEmbeddedResources()
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


        protected abstract IEnumerable<NHRegisterEventMessage> RegistDaos();

        protected virtual void GetInjectControllers(out IEnumerable<Type> controller,
            out IEnumerable<Type> apiController)
        {
            //���һ��Assembly(Plugin)�����ж��Area�������Ͳ����ظ�ע��Cotnroller����Ϣ��
            var assembly = GetType().Assembly;
            if (!controllerCollection.ContainsKey(assembly))
            {
                AssemblyHelper.FindController(GetType().Assembly, out controller, out apiController);
                controllerCollection.Add(assembly, 0);
            }
            apiController = null;
            controller = null;
        }

        private static System.Collections.Generic.Dictionary<Assembly, int> controllerCollection = new Dictionary<Assembly, int>();

    }
}