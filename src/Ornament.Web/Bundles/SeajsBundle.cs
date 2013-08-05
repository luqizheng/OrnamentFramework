using System.IO;
using System.Web.Optimization;

namespace Ornament.Web.Bundles
{
    /// <summary>
    /// 
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

        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent, System.Collections.Generic.IEnumerable<BundleFile> bundleFiles)
        {
            var fileInfo = new FileInfo(_virtualPath);

            int lastPost = _virtualPath.LastIndexOf('/');
            var path = _virtualPath.Substring(0, lastPost);
            CombineSeajs seajs = new CombineSeajs(bundleContent, fileInfo.Name, path, "/scripts/models/base/");
            var a = base.ApplyTransforms(context, seajs.Processs(), bundleFiles);
            return a;
        }
    }
}