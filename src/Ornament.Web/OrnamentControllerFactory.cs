using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using System.Web.Routing;
using Castle.MicroKernel;
using Castle.MicroKernel.Registration;
using Castle.Windsor;

namespace Ornament.Web
{
    /// <summary>
    /// </summary>
    public class OrnamentControllerFactory : DefaultControllerFactory
    {
        private readonly WindsorContainer _container;

        /// <summary>
        ///     Create defaultFacotryy
        /// </summary>
        /// <param name="controllers">a set type, it will auto to filer the</param>
        public OrnamentControllerFactory(params Type[] controllers)
        {
            if (controllers == null)
                throw new ArgumentNullException("controllers");
            _container = (WindsorContainer) OrnamentContext.IocContainer;
            foreach (Type t in controllers)
            {
                _container.Register(Component.For(t).LifestyleTransient());
            }

            _container.Register(
                Component.For(typeof (OrnamentContext)).LifestyleSingleton().Instance(OrnamentContext.Current)
                );
        }

        public Type ErrorController { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="assemblies"></param>
        /// <returns></returns>
        public static Type[] FilterController(Assembly assemblies)
        {
            // Also register all the controller types as transient
            IEnumerable<Type> controllerTypes = from t in assemblies.GetTypes()
                                                where typeof (IController).IsAssignableFrom(t)
                                                select t;
            return controllerTypes.ToArray();
        }

        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            //try
            //{
            if (controllerType == null)
            {
                return SetToNotFoundPage(requestContext.RouteData);
            }
            var controlType = _container.Resolve(controllerType) as IController;
            if (controlType != null)
            {
                return controlType;
            }
            requestContext.HttpContext.Response.StatusCode = 404;
            return SetToNotFoundPage(requestContext.RouteData);
            //}
            //catch (Exception ex)
            //{
            //    requestContext.RouteData.Values["action"] = "Error";
            //    requestContext.RouteData.Values["controller"] = "HttpErrors";
            //    requestContext.RouteData.Values["Error"] = ex;
            //    return _container.Resolve(ErrorController) as IController;
            //}
        }

        private bool HasAction(string name, Type controllerType)
        {
            name = name.ToLower();
            return controllerType.GetMethods().Any(method => method.Name.ToLower() == name);
        }

        private IController SetToNotFoundPage(RouteData routeData)
        {
            routeData.Values["action"] = "NotFound";
            routeData.Values["controller"] = "HttpErrors";
            return _container.Resolve(ErrorController) as IController;
        }
    }
}