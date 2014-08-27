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
using System.Web.Security;
using Castle.MicroKernel.Registration;
using log4net;
using log4net.Config;
using Ornament;
using Ornament.Configurations;
using Ornament.Web;
using Ornament.Web.Cfg;
using Ornament.Web.IoC;
using Ornament.Web.MemberShips;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;
using Ornament.Web.PortableAreas.InputBuilder;
using Ornament.Web.SeajsModules;
using Qi.Web.Mvc;
using SeajsBundles.Seajs.Modules;
using WebApplication.Controllers;

namespace WebApplication
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            XmlConfigurator.Configure(); //Log4net registry.
            AreaRegistration.RegisterAllAreas();
            NHConfig.Instance.Regist(); //初始化NH配置

            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            GlobalConfiguration.Configure(WebApiConfig.Register);
            LauguageConfig.Register(OrnamentContext.Configuration);

            GlobalConfiguration.Configuration.DependencyResolver = new CastleDependcyResolver();

            ChangeControllerFacotry(typeof (HttpErrorsController), Assembly.GetExecutingAssembly());

            NHibernateMvcRegister.Regist(); //修改MVC ModelHandler等配置
            Ornament.MemberShip.User.ValidateUserPolicy = new WebValidateUserPolicy(Membership.Provider);
            InputBuilder.BootStrap();
            //加入Assembly合并模块是,插入到第二为,因为第一位是ReferenceFactory
            SeajsModuleFactory.Instance.Add(new CombineModuleAsssemblyFactory(), 1);
            SeajsModuleBundleMessageHandle.HandlAllBundle();
        }

        protected void Application_EndRequest()
        {
            var context = new HttpContextWrapper(Context);
            // If we're an ajax request, and doing a 302, then we actually need to do a 401
            if (Context.Response.StatusCode == 302 && context.Request.IsAjaxRequest())
            {
                Context.Response.Clear();
                Context.Response.StatusCode = 401;
            }
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
                OrnamentContext.IocContainer.Register(
                    Component.For<IHttpControllerActivator>().Instance(apiController).LifestyleSingleton());

                ControllerBuilder.Current.SetControllerFactory(defaultController);
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(typeof (MvcWebConfig)).Error("ChangeControllerFacotry fail", ex);
            }
        }
    }
}