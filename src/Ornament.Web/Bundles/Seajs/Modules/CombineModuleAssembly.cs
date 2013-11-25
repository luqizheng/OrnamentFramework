using System;
using System.IO;
using System.Web.Optimization;
using System.Web.Routing;
using MvcContrib.PortableAreas;
using MvcContrib.UI.InputBuilder.ViewEngine;

namespace Ornament.Web.Bundles.Seajs.Modules
{
    /// <summary>
    ///     这个模块式在Plugin里面的.并且需要合并
    /// </summary>
    public class CombineModuleAssembly : CombineModule
    {
        public CombineModuleAssembly(BundleContext context, string uniquireId, bool combine)
            : base(uniquireId, context, combine)
        {
        }

        public override string Content
        {
            get
            {
                RouteData resData = RouteUtils.GetRouteDataByUrl(UniqueId);
                if (resData == null)
                    throw new ArgumentOutOfRangeException(UniqueId +
                                                          " is not a assembly embeded resources with js file.");
                var areaName = (string) resData.DataTokens["area"];
                string resourcePath = resData.Values["resourcePath"].ToString();
                string resourceName = resData.Values["resourceName"].ToString();
                resourceName = resourcePath + "." + resourceName;
                AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
                Stream resourceStream = resourceStore.GetResourceStream(resourceName);
                using (var readerStream = new StreamReader(resourceStream))
                {
                    string content = readerStream.ReadToEnd();
                    return content;
                }
            }
        }

        public static bool IsAssemblyCombineModules(string uniqureId)
        {
            RouteData resData = RouteUtils.GetRouteDataByUrl(uniqureId);
            if (resData == null || !resData.Values.ContainsKey("resourcePath"))
                return false;

            var areaName = (string) resData.DataTokens["area"];
            string resourcePath = resData.Values["resourcePath"].ToString();
            string resourceName = resData.Values["resourceName"].ToString();
            resourceName = resourcePath + "." + resourceName;
            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
            Stream resourceStream = resourceStore.GetResourceStream(resourceName);
            return resourceStream != null;
        }
    }
}