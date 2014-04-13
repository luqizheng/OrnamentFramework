namespace Ornament.Web.SeajsModules
{
    using Ornament.Web.PortableAreas;
    using SeajsBundles;
    using SeajsBundles.Seajs;
    using System;
    using System.Web.Optimization;
    using System.Web.Routing;

    public class CombineModuleAssembly : CombineModule
    {
        public CombineModuleAssembly(BundleContext context, string uniquireId, bool combine) : base(uniquireId, context, combine)
        {
        }

        public static bool IsAssemblyCombineModules(string uniqureId)
        {
            RouteData routeDataByUrl = RouteUtils.GetRouteDataByUrl(uniqureId);
            if (routeDataByUrl == null)
            {
                return false;
            }
            string areaName = (string) routeDataByUrl.DataTokens["area"];
            if (areaName == null)
            {
                return false;
            }
            if (AssemblyResourceManager.GetResourceStoreForArea(areaName) == null)
            {
                return false;
            }
            return (BundleTable.Bundles.GetBundleFor(uniqureId) is SeajsEmbedBundle);
        }

        public override string Content
        {
            get
            {
                SeajsEmbedBundle bundleFor = BundleTable.Bundles.GetBundleFor(base.AbsolutePath) as SeajsEmbedBundle;
                if (RouteUtils.GetRouteDataByUrl(base.RequireId) == null)
                {
                    throw new ArgumentOutOfRangeException(base.RequireId + " is not a assembly embeded resources with js file.");
                }
                return bundleFor.GetContent(base.RequireId);
            }
        }
    }
}

