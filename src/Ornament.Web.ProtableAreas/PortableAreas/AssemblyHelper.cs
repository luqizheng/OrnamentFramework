using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;

namespace Ornament.Web.PortableAreas
{
    public static class AssemblyHelper
    {
        public static void FindController(Assembly webAssembly, out IEnumerable<Type> apiControllers,
            out IEnumerable<Type> controllers)
        {
            apiControllers = new List<Type>();
            controllers = new List<Type>();

            //Web Assembly assembly
            FindController(webAssembly, (List<Type>) apiControllers, (List<Type>) controllers);
        }


        private static void FindController(Assembly assembly, List<Type> apiControllerResult,
            List<Type> controllerResult)
        {
            foreach (Type t in assembly.GetTypes())
            {
                if (typeof (IController).IsAssignableFrom(t))
                {
                    controllerResult.Add(t);
                    continue;
                }
                if (typeof (ApiController).IsAssignableFrom(t))
                {
                    apiControllerResult.Add(t);
                }
            }
        }
    }
}