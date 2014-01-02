using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.Web.Cfg;

namespace Ornament.Web.PortableAreas
{
    public abstract class PortableAreaRegistration : AreaRegistration
    {
        public static Action RegisterEmbeddedViewEngine = () => { InputBuilder.InputBuilder.BootStrap(); };
        public static Action CheckAreasWebConfigExists = () => { EnsureAreasWebConfigExists(); };

        public virtual PortableAreaMap GetMap() { return null; }
        public virtual string AreaRoutePrefix
        {
            get { return AreaName; }
        }

        public virtual void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {

            bus.Send(new PortableAreaStartupMessage(AreaName));

            RegisterDefaultRoutes(context);

            RegisterAreaEmbeddedResources();

            var ite = this.RegistDaos();
            if (ite != null)
            {
                foreach (var imple in ite)
                {
                    OrnamentContext.DaoFactory.Regist(imple.Interface, imple.Implement);
                }
            }


        }

        public void CreateStaticResourceRoute(AreaRegistrationContext context, string SubfolderName)
        {
            context.MapRoute(
            AreaName + "-" + SubfolderName,
            AreaRoutePrefix + "/" + SubfolderName + "/{resourceName}",
            new { controller = "EmbeddedResource", action = "Index", resourcePath = "Content." + SubfolderName },
            null,
            new[] { "Ornament.Web.PortableAreas" }
            );
        }

        public void RegisterDefaultRoutes(AreaRegistrationContext context)
        {
            CreateStaticResourceRoute(context, "Images");
            CreateStaticResourceRoute(context, "Styles");
            CreateStaticResourceRoute(context, "Scripts");
            context.MapRoute(AreaName + "-Default",
                                             AreaRoutePrefix + "/{controller}/{action}",
                                             new { controller = "default", action = "index" });
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            RegisterArea(context, Bus.Instance);

            RegisterEmbeddedViewEngine();

            CheckAreasWebConfigExists();
        }

        public void RegisterAreaEmbeddedResources()
        {
            var areaType = GetType();
            var resourceStore = new AssemblyResourceStore(areaType, "/areas/" + AreaName.ToLower(), areaType.Namespace, GetMap());
            AssemblyResourceManager.RegisterAreaResources(resourceStore);
        }

        private static void EnsureAreasWebConfigExists()
        {
            var config = System.Web.HttpContext.Current.Server.MapPath("~/areas/web.config");
            if (!File.Exists(config))
            {
                throw new Exception("Portable Areas require a ~/Areas/Web.config file in your host application. Copy the config from ~/views/web.config into a ~/Areas/ folder.");
            }
        }


        public abstract IEnumerable<DaoRegistryInformation> RegistDaos();
    }

    public class DaoRegistryInformation
    {
        public DaoRegistryInformation(Type @interface, Type impletment)
        {
            this.Interface = @interface;
            this.Implement = impletment;
        }
        public Type Interface { get; set; }

        public Type Implement { get; set; }

    }
}