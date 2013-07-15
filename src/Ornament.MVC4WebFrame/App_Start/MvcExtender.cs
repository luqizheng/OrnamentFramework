using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using Castle.MicroKernel.Registration;
using Ornament.MVCWebFrame.Api.Core;
using Ornament.MVCWebFrame.Controllers;
using Ornament.Validations;
using Ornament.Web;
using Ornament.Web.IoC;
using Ornament.Web.ValidationAdapter;
using Qi.Web.Mvc;
using Qi.Web.Mvc.NHMvcExtender;
using log4net;

namespace Ornament.MVCWebFrame.App_Start
{
    public class MvcExtender
    {
        public static void Register()
        {
            //NHibernate Extender
            ValueProviderFactories.Factories[1] = new NHFormValueProviderFactory();
            ValueProviderFactories.Factories[3] = new NHRouterDataProviderFactory();
            ValueProviderFactories.Factories[4] = new NHQueryValuePrivoderFactory();
            //change the default binder.
            ModelBinders.Binders.DefaultBinder = new NHModelBinder();


            //Mvc Ioc of Castle.
            ChangeControllerFacotry();

            //Web API for castle inject.
            var httpDependencyResolver =
                new OrnamentWebApiFactory(OrnamentWebApiFactory.FilterController(typeof(RolesController).Assembly));

            OrnamentContext.IocContainer.Register(Component.For<IHttpControllerActivator>()
                                                           .Instance(httpDependencyResolver).LifestyleSingleton());


            GlobalConfiguration.Configuration.DependencyResolver = new CastleDependcyResyle();
            //for jquery spiner step,
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(JqStepAttribute), typeof(StepAttributeAdapter));
        }
        private static void ChangeControllerFacotry()
        {
            try
            {
                Type[] controllerTypes = OrnamentControllerFactory.FilterController(Assembly.GetExecutingAssembly());

                ////change the default controller.
                ControllerBuilder.Current.SetControllerFactory(new OrnamentControllerFactory(controllerTypes)
                    {
                        ErrorController = typeof(HttpErrorsController)
                    });
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(typeof(MvcExtender)).Error("ChangeControllerFacotry fail", ex);
            }
        }
    }
}