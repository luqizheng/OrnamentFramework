using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Castle.MicroKernel.Registration;
using log4net;
using Ornament;
using Ornament.Configurations;
using Ornament.Web;
using Ornament.Web.Cfg;
using Ornament.Web.PortableAreas;
using Qi.Web.Mvc;
using WebApplication.Controllers;

namespace WebApplication
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            NHConfig.Instance.Regist(); //初始化NH配置

            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            GlobalConfiguration.Configure(WebApiConfig.Register);
            LauguageConfig.Register(OrnamentContext.Configuration);

            NHibernateMvcRegister.Regist(); //修改MVC ModelHandler等配置

            ChangeControllerFacotry(typeof (HttpErrorsController), Assembly.GetExecutingAssembly());
        }

        private static void ChangeControllerFacotry(Type httpErrorsController, Assembly webAssembly)
        {
            IEnumerable<Type> controllers;
            IEnumerable<Type> apiControllers;
            AssemblyHelper.FindController(webAssembly, out controllers, out apiControllers);

            var defaultController = new OrnamentControllerFactory(controllers)
            {
                ErrorController = httpErrorsController
            };

            var apiController = new OrnamentWebApiFactory(apiControllers.ToArray());
            try
            {
                OrnamentContext.IocContainer.Register(Component.For<IHttpControllerActivator>().Instance(apiController).LifestyleSingleton());
                ControllerBuilder.Current.SetControllerFactory(defaultController);
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(typeof (MvcWebConfig)).Error("ChangeControllerFacotry fail", ex);
            }
        }
    }
}