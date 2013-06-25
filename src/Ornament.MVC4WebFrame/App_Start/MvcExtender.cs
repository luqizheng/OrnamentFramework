using System;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Controllers;
using Ornament.Web;
using Qi.Web.Mvc;
using Qi.Web.Mvc.NHMvcExtender;
using log4net;

namespace Ornament.MVCWebFrame.App_Start
{
    public class MvcExtender
    {
        public static void Register()
        {
            //
            ValueProviderFactories.Factories[1] = new NHFormValueProviderFactory();
            //ValueProviderFactories.Factories[3] = new NHRouterDataProviderFactory();
            ValueProviderFactories.Factories[4] = new NHQueryValuePrivoderFactory();

            //change the default binder.
            ModelBinders.Binders.DefaultBinder = new NHModelBinder();

            ChangeControllerFacotry();

            //Web API for castle inject.
            var httpDependencyResolver =
                new OrnamentWebApiFactory(OrnamentWebApiFactory.FilterController(Assembly.GetExecutingAssembly()));
            GlobalConfiguration.Configuration.Services.Replace(typeof (IHttpControllerActivator), httpDependencyResolver);
        }

        private static void ChangeControllerFacotry()
        {
            try
            {
                Type[] controllerTypes = OrnamentControllerFactory.FilterController(Assembly.GetExecutingAssembly());

                ////change the default controller.
                ControllerBuilder.Current.SetControllerFactory(new OrnamentControllerFactory(controllerTypes)
                    {
                        ErrorController = typeof (HttpErrorsController)
                    });
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(typeof (MvcExtender)).Error("ChangeControllerFacotry fail", ex);
            }
        }
    }
}