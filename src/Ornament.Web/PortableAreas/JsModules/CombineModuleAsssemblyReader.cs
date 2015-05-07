using System.Web.Optimization;
using System.Web.Routing;
using CombineJsBundles;
using CombineJsBundles.Modules;
using CombineJsBundles.Readers;


namespace Ornament.Web.PortableAreas.JsModules
{
    public class CombineModuleAsssemblyReader : CombineModuleReader
    {
        protected override string GetContent(Bundle bundle, BundleContext context, ScriptModule module)
        {
            var bundleFor = IsAssemblyCombineModules(module.AbsolutePath);
            if (bundleFor == null)
                return null;
            return bundleFor.Builder.BuildBundleContent(bundle, context, bundleFor.EnumerateFiles(context));
        }

        private static EmbedBundle IsAssemblyCombineModules(string uniqureId)
        {
            RouteData routeDataByUrl = RouteUtils.GetRouteDataByUrl(uniqureId);
            if (routeDataByUrl == null)
            {
                return null;
            }
            var areaName = (string)routeDataByUrl.DataTokens["area"];
            if (areaName == null)
            {
                return null;
            }
            if (AssemblyResourceManager.GetResourceStoreForArea(areaName) == null)
            {
                return null;
            }
            return BundleTable.Bundles.GetBundleFor(uniqureId) as EmbedBundle;
        }
    }
}