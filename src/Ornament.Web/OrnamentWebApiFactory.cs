using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using Castle.MicroKernel.Registration;
using Castle.Windsor;

namespace Ornament.Web
{
    public class OrnamentWebApiFactory : IHttpControllerActivator
    {
        public OrnamentWebApiFactory()
        {
        }

        public OrnamentWebApiFactory(params Type[] controllers)
        {
            Regist(controllers);
        }

        public IWindsorContainer Container
        {
            get { return OrnamentContext.IocContainer; }
        }

        IHttpController IHttpControllerActivator.Create(HttpRequestMessage request,
            HttpControllerDescriptor controllerDescriptor,
            Type controllerType)
        {
            var controller = (IHttpController) Container.Resolve(controllerType);
            return controller;
        }

        public void Regist(params Type[] controllers)
        {
            if (controllers != null)
            {
                foreach (Type t in controllers)
                {
                    Container.Register(Component.For(t).LifestyleTransient());
                }
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="assemblies"></param>
        /// <returns></returns>
        public static Type[] FilterController(Assembly assemblies)
        {
            // Also register all the controller types as transient
            IEnumerable<Type> controllerTypes = from t in assemblies.GetTypes()
                where typeof (ApiController).IsAssignableFrom(t)
                select t;
            return controllerTypes.ToArray();
        }
    }
}