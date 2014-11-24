using System;
using System.Web.Optimization;
using System.Web.Routing;
using CombineJs;
using CombineJs.Modules;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.SeajsModules
{
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
                var bundleFor = BundleTable.Bundles.GetBundleFor(base.AbsolutePath) as SeajsEmbedBundle;
                if (RouteUtils.GetRouteDataByUrl(base.RequireId) == null)
                {
                    throw new ArgumentOutOfRangeException(base.RequireId +
                                                          " is not a assembly embeded resources with js file.");
                }


                return bundleFor.Builder.BuildBundleContent(bundleFor, Context, bundleFor.EnumerateFiles(Context));
            }
        }

        public static bool IsAssemblyCombineModules(string uniqureId)
        {
            RouteData routeDataByUrl = RouteUtils.GetRouteDataByUrl(uniqureId);
            if (routeDataByUrl == null)
            {
                return false;
            }
            var areaName = (string) routeDataByUrl.DataTokens["area"];
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
    }
}