﻿using System;
using System.Collections.Generic;
using System.Linq;
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
using Ornament.Web.Controllers;
using Ornament.Web.DataInitializers;
using Ornament.Web.IoC;
using Ornament.Web.ModelBinder;
using Ornament.Web.Models;
using Ornament.Web.PortableAreas;
using Ornament.Web.SeajsModules;
using Ornament.Web.ValidationAdapter;
using Qi;
using Qi.Web.Mvc;
using SeajsBundles.Seajs.Modules;

namespace Ornament.Web.Cfg
{
    public class MvcWebConfig
    {
        public static void Regist(VoidFunc mvcNormalInit, Type httpErrorControllerType, Assembly webAssembly)
        {
            //AddProtableMessageHandler();
            Exception nhibernateException = null;
            mvcNormalInit();
            try
            {
                NHConfig.Instance.Regist(); //初始化NH配置
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(typeof(MvcWebConfig)).Fatal("nhibernate mapping error.", ex);
                nhibernateException = ex;
            }

            NHibernateMvcRegister.Regist(); //修改MVC ModelHandler等配置
            ExtenderModelType();

            //
            GlobalConfiguration.Configuration.DependencyResolver = new CastleDependcyResolver();

            //新的Attribute，用于JquerUI spinner控件一起用
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(JqStepAttribute),
                typeof(StepAttributeAdapter));

            //把ControllerFactory和castle联系起来
            ChangeControllerFacotry(httpErrorControllerType, webAssembly);
            //Web MemberShip的加密方法
            MembershipContext.Provider = Membership.Provider as IMemberShipProvider;


            //加入Assembly合并模块是
            SeajsModuleFactory.Instance.Add(new CombineModuleAsssemblyFactory());
        }

        //private static void AddProtableMessageHandler()
        //{
        //    Bus.AddMessageHandler(typeof(NHConfigurationHandler)); //处理每个Plutin的关于NH的处理方法
        //    Bus.AddMessageHandler(typeof(DataInitialateMessageHandler));
        //}

        private static void ExtenderModelType()
        {
            var timeModelBiner = new TimeModelBinder();
            ModelBinders.Binders.Add(typeof(Time), timeModelBiner);
            ModelBinders.Binders.Add(typeof(Time?), timeModelBiner);
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

        public static void InitData()
        {
            try
            {
                GlobalInitializer.UpdateAllSturcture();
                GlobalInitializer.BuildData();
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(typeof(MvcWebConfig)).Fatal("nhibernate update error.", ex);
                throw ex;
            }
        }
    }
}