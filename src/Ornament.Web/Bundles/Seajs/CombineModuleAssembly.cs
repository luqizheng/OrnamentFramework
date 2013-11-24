using System;
using System.IO;
using System.Web.Optimization;
using System.Web.Routing;
using MvcContrib.PortableAreas;
using MvcContrib.UI.InputBuilder.ViewEngine;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    ///     这个模块式在Plugin里面的.并且需要合并
    /// </summary>
    public class CombineModuleAssembly : CombineModule
    {
        public CombineModuleAssembly(BundleContext context, string uniquireId,
            string virtualPath, bool combine)
            : base(context, uniquireId, virtualPath, combine)
        {
        }

        public override string BuildContent(ModualIdSets combinedModules, ModuleCollection referencModule)
        {
            //try to get from Assembly;
            /*var path = PhysciPath.Replace("/", ".");
            var area = path.Split(new[] { "." }, StringSplitOptions.RemoveEmptyEntries)[0];*/
            RouteData resData = RouteUtils.GetRouteDataByUrl(PhysciPath);
            if(resData==null)
                throw new ArgumentOutOfRangeException(PhysciPath+" is not a assembly embeded resources with js file.");
            var areaName = (string) resData.DataTokens["area"];
            string resourcePath = resData.Values["resourcePath"].ToString();
            string resourceName = resData.Values["resourceName"].ToString();
            resourceName = resourcePath + "." + resourceName;
            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
            Stream resourceStream = resourceStore.GetResourceStream(resourceName);
            using (var readerStream = new StreamReader(resourceStream))
            {
                string content = readerStream.ReadToEnd();
                return BuildContent(content, combinedModules, referencModule);
            }
        }

        public static bool IsAssemblyCombineModules(string uniqureId)
        {
            RouteData resData = RouteUtils.GetRouteDataByUrl(uniqureId);
            if (resData == null)
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