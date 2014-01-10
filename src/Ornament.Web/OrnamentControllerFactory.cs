using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Ornament.Web.Controllers;

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
        public OrnamentControllerFactory(IEnumerable<Type> controllers)
        {
            if (controllers == null)
                throw new ArgumentNullException("controllers");
            _container = (WindsorContainer) OrnamentContext.IocContainer;
            Regist(controllers.ToArray());
            Regist(typeof (SeajsModuleEmbeddedResourceController));
            Regist(typeof (EmbeddedResourceController));
        }

        public Type ErrorController { get; set; }

        public void Regist(params Type[] controllers)
        {
            if (controllers == null || controllers.Length == 0)
                return;
            foreach (Type t in controllers)
            {
                _container.Register(Component.For(t).LifestyleTransient());
            }
        }

        protected override Type GetControllerType(RequestContext requestContext, string controllerName)
        {
            Type result = base.GetControllerType(requestContext, controllerName);
            return result;
        }

        public override IController CreateController(RequestContext requestContext, string controllerName)
        {
            IController result = base.CreateController(requestContext, controllerName);
            return result;
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