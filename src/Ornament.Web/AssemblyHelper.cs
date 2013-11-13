using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;

namespace Ornament.Web
{
    public static class AssemblyHelper
    {
        public static void FindController(Assembly webAssembly, out Type[] apiControllers, out Type[] controllers)
        {
            var apiControllerResult = new List<Type>();
            var controllerResult = new List<Type>();

            //Web Assembly assembly
            FindController(webAssembly, apiControllerResult, controllerResult);
            //another plugin assembly
            GetPluginAssemblies(apiControllerResult, controllerResult);

            apiControllers = apiControllerResult.ToArray();
            controllers = controllerResult.ToArray();
        }

        private static void GetPluginAssemblies(List<Type> apiControllerResult, List<Type> controllerResult)
        {
            foreach (Assembly assembly in
                AppDomain.CurrentDomain.GetAssemblies())
            {
                if (assembly.GetName().Name.ToLower().EndsWith("plugin"))
                {
                    FindController(assembly, apiControllerResult, controllerResult);
                }
            }
        }

        private static void FindController(Assembly assembly, List<Type> apiControllerResult,
                                           List<Type> controllerResult)
        {
            foreach (Type t in assembly.GetTypes())
            {
                if (typeof(IController).IsAssignableFrom(t))
                {
                    controllerResult.Add(t);
                    continue;
                }
                if (typeof(ApiController).IsAssignableFrom(t))
                {
                    apiControllerResult.Add(t);
                }
            }
        }
    }
}