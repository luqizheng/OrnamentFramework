﻿using System;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using System.Web.Security;
using Castle.MicroKernel.Registration;
using log4net;
using Ornament.Configurations;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.Validations;
using Ornament.Web.DataInitializers;
using Ornament.Web.IoC;
using Ornament.Web.MessageHandlers;
using Ornament.Web.ModelBinder;
using Ornament.Web.ValidationAdapter;
using Qi;
using Qi.Web.Mvc;

namespace Ornament.Web.Cfg
{
    public class MvcWebConfig
    {
        public static void Regist(VoidFunc mvcNormalInit, Type httpErrorControllerType, Assembly webAssembly)
        {
            //AddProtableMessageHandler();
            mvcNormalInit();
            NHConfig.Instance.Regist(); //初始化NH配置
            NHibernateMvcRegister.Regist();//修改MVC ModelHandler等配置
            ExtenderModelType();

            //
            GlobalConfiguration.Configuration.DependencyResolver = new CastleDependcyResyle();

            //新的Attribute，用于JquerUI spinner控件一起用
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(JqStepAttribute),
                typeof(StepAttributeAdapter));

            //把ControllerFactory和castle联系起来
            ChangeControllerFacotry(httpErrorControllerType, webAssembly);
            //Web MemberShip的加密方法
            MembershipContext.Provider = Membership.Provider as IMemberShipProvider;

            GlobalInitializer.UpdateAllSturcture();
            GlobalInitializer.BuildData();
        }

        private static void AddProtableMessageHandler()
        {
            Bus.AddMessageHandler(typeof(NHConfigurationHandler)); //处理每个Plutin的关于NH的处理方法
            Bus.AddMessageHandler(typeof(DataInitialateMessageHandler));
        }

        private static void ExtenderModelType()
        {
            var timeModelBiner = new TimeModelBinder();
            ModelBinders.Binders.Add(typeof(Time), timeModelBiner);
            ModelBinders.Binders.Add(typeof(Time?), timeModelBiner);
        }


        private static void ChangeControllerFacotry(Type httpErrorsController, Assembly webAssembly)
        {
            Type[] apiControllers;
            Type[] controllers;
            AssemblyHelper.FindController(webAssembly,
                out apiControllers, out controllers);

            var defaultController = new OrnamentControllerFactory(controllers)
            {
                ErrorController = httpErrorsController
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
                LogManager.GetLogger(typeof(MvcWebConfig)).Error("ChangeControllerFacotry fail", ex);
            }
        }
    }
}