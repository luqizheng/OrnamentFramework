using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Ornament.Contexts;

namespace Ornament.AppStart
{
    public static class OnStart
    {
        private static readonly string[] SkipAssemblyPrefix = new[]
            {
                "System",
                "Microsoft",
                "Castle",
                "mscorlib",
                "NHibernate",
                "log4net",
                "MvcSiteMapProvider",
                "Newtonsoft",
                "Antlr3",
                "dotless",
                "Iesi.Collection"
            };

        public static void Start(OrnamentConfiguration ornamentContext, params Assembly[] assemblies)
        {
            foreach (Assembly assembly in assemblies)
            {
                if (SkipAssemblyPrefix.Any(s => assembly.FullName.StartsWith(s)))
                    continue;

                IEnumerable<Type> types = from t in assembly.GetTypes()
                                          where typeof (IInitialization).IsAssignableFrom(t)
                                          select t;
                foreach (Type type in types)
                {
                    if (type == typeof (IInitialization))
                        continue;
                    var obj = Activator.CreateInstance(type) as IInitialization;
                    obj.OnStart(ornamentContext);
                }
            }
        }
    }
}