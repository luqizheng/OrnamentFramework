using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using Ornament.Web.Bundles.Seajs;

namespace Ornament.Web.Bundles
{
    /// <summary>
    /// </summary>
    public class SeajsBundle : ScriptBundle
    {
        public SeajsBundle(string virtualPath, bool combine)
            : base(virtualPath)
        {
            Combine = combine;

            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify());
            }
        }

        public SeajsBundle(string virtualPath, string cdnPath)
            : base(virtualPath, cdnPath)
        {
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify());
            }
        }

        public bool Combine { get; set; }

        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent,
                                                       IEnumerable<BundleFile> bundleFiles)
        {
            var physicPath = context.HttpContext.Request.MapPath(bundleFiles.First().VirtualFile.VirtualPath);
            var seajs = new RootModule(context, physicPath, Path, Combine);
            string subContent = seajs.BuildContent(bundleContent);
            BundleResponse result = base.ApplyTransforms(context, subContent, bundleFiles);
            if (!BundleTable.EnableOptimizations)
            {
                result.Cacheability = HttpCacheability.NoCache;
            }
            return result;
        }
    }
}