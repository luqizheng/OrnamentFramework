using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.AppStart
{
    public static class OnStart
    {
        private static string[] SkipAssemblyPrefix = new string[]
            {
                "System",
                "Microsoft",
                "Castle",
                "mscorlib",
                "NHibernate",
                "log4net",
                "Qi",
                "MvcSiteMapProvider",
                "Newtonsoft",
                "Antlr3",
                "dotless",
                "Iesi.Collection"
            };
        public static void Start(Context context, params Assembly[] assemblies)
        {
            foreach (var assembly in assemblies)
            {

                if (SkipAssemblyPrefix.Any(s => assembly.FullName.StartsWith(s)))
                    continue;

                IEnumerable<Type> types = from t in assembly.GetTypes()
                                          where typeof(IInitialization).IsAssignableFrom(t)
                                          select t;
                var count = types.Count();
                foreach (var type in types)
                {
                    if (type == typeof(IInitialization))
                        continue;
                    var obj = Activator.CreateInstance(type) as IInitialization;
                    obj.OnStart(context);
                }
            }
        }
    }
}
