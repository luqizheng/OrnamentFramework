using System;
using System.Web.Optimization;
using System.Web.Routing;
using Ornament.Web.PortableAreas;
using SeajsBundles;
using SeajsBundles.Seajs;

namespace Ornament.Web.SeajsModules
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
                var bundle = BundleTable.Bundles.GetBundleFor(AbsolutePath) as SeajsEmbedBundle;

                RouteData resData = RouteUtils.GetRouteDataByUrl(RequireId);
                if (resData == null)
                    throw new ArgumentOutOfRangeException(RequireId +
                                                          " is not a assembly embeded resources with js file.");
                return bundle.GetContent(RequireId);
            }
        }

        public static bool IsAssemblyCombineModules(string uniqureId)
        {
            RouteData resData = RouteUtils.GetRouteDataByUrl(uniqureId);
            if (resData == null)
                return false;

            var areaName = (string) resData.DataTokens["area"];
            if (areaName == null)
                return false;
            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
            if (resourceStore == null)
                return false;

            Bundle bundleFile = BundleTable.Bundles.GetBundleFor(uniqureId);
            return bundleFile is SeajsEmbedBundle;
        }
    }
}