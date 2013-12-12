using System;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using Castle.MicroKernel.Registration;
using Ornament.MVCWebFrame.Controllers;
using Ornament.Validations;
using Ornament.Web;
using Ornament.Web.IoC;
using Ornament.Web.ModelBinder;
using Ornament.Web.ValidationAdapter;
using Qi;
using Qi.Web.Mvc;
using Qi.Web.Mvc.NHMvcExtender;
using log4net;

namespace Ornament.MVCWebFrame.App_Start
{
    public class MvcExtender
    {
        public static void Register()
        {
            NHibernateMvcRegister.Regist();
            ExtenderModelType();


            //Mvc Ioc of Castle.
            ChangeControllerFacotry();


            GlobalConfiguration.Configuration.DependencyResolver = new CastleDependcyResyle();
            //for jquery spiner step,
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof (JqStepAttribute),
                                                                  typeof (StepAttributeAdapter));
        }

        private static void ExtenderModelType()
        {
            ModelBinders.Binders.Add(typeof (Time), new TimeModelBinder());
            ModelBinders.Binders.Add(typeof (Time?), new TimeModelBinder());
        }

        /// <summary>
        ///     为容器添加添加Controller的依赖
        /// </summary>
        private static void ChangeControllerFacotry()
        {
            Type[] apiControllers;
            Type[] controllers;
            AssemblyHelper.FindController(Assembly.GetExecutingAssembly(), out apiControllers, out controllers);

            var defaultController = new OrnamentControllerFactory(controllers)
                {
                    ErrorController = typeof (HttpErrorsController)
                };


            var apiController = new OrnamentWebApiFactory(apiControllers);


            try
            {
                OrnamentContext.IocContainer.Register(Component.For<IHttpControllerActivator>()
                                                               .Instance(apiController).LifestyleSingleton());

                ////change the default controller.
                ControllerBuilder.Current.SetControllerFactory(defaultController);
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(typeof (MvcExtender)).Error("ChangeControllerFacotry fail", ex);
            }
        }
    }
}