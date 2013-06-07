using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Web.Http.Controllers;
using System.Web.Http.Dependencies;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using Castle.MicroKernel.Registration;
using Castle.Windsor;

namespace Ornament.Web
{
    public class OrnamentWebApiFactory : IHttpControllerActivator 
    {
        private readonly WindsorContainer _container;
        public OrnamentWebApiFactory(params Type[] controllers)
        {
            if (controllers == null)
                throw new ArgumentNullException("controllers");
            _container = (WindsorContainer)OrnamentContext.Current.Container;
            foreach (Type t in controllers)
            {
                _container.Register(Component.For(t).LifestyleTransient());
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
                                                where typeof(IHttpController).IsAssignableFrom(t)
                                                select t;
            return controllerTypes.ToArray();
        }

        public IHttpController Create(HttpRequestMessage request, HttpControllerDescriptor controllerDescriptor, Type controllerType)
        {
            var controller = (IHttpController)_container.Resolve(controllerType);
            return controller;
        }
    }
}