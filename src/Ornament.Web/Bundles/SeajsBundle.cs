using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Optimization;
using Ornament.Web.Bundles.Seajs;
using Qi;

namespace Ornament.Web.Bundles
{
    /// <summary>
    /// </summary>
    public class SeajsBundle : ScriptBundle
    {
        private readonly string _virtualPath;

        public SeajsBundle(string virtualPath)
            : base(virtualPath)
        {
            _virtualPath = virtualPath.TrimStart('~');
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify(virtualPath));
            }
        }

        public SeajsBundle(string virtualPath, string cdnPath)
            : base(virtualPath, cdnPath)
        {
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify(_virtualPath));
            }
        }

        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent,
                                                       IEnumerable<BundleFile> bundleFiles)
        {
            var seajs = new RootModule(this.Path, this.Path);
            var subContent = seajs.BuildContent(bundleContent);
            BundleResponse result = base.ApplyTransforms(context, subContent, bundleFiles);
#if DEBUG
            UpdateCache(context, result);
#endif
            return result;
        }
    }
}