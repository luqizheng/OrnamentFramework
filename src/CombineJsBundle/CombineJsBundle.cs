using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;
using SeajsBundles;
using SeajsBundles.Seajs;

namespace CombineJs
{
    /// <summary>
    ///     Module
    /// </summary>
    public class CombineJsBundle : ScriptBundle
    {
        public CombineJsBundle(string virtualPath, bool combine)
            : this(virtualPath, combine, null)
        {
        }

        public CombineJsBundle(string virtualPath, bool combine, string cdnPath)
            : base(virtualPath, cdnPath)
        {
            Combine = combine;
        }

        public bool Combine { get; set; }

        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent,
            IEnumerable<BundleFile> bundleFiles)
        {
            if (BundleTable.EnableOptimizations)
            {
                for (int i = 0; i < Transforms.Count; i++)
                {
                    if (Transforms[i] is JsMinify)
                    {
                        Transforms[i] = new SeajsMinify();
                        break;
                    }
                }
            }
            else
            {
                this.Transforms.Clear();
            }
            string path = Path;
            BundleFile[] enumerable = bundleFiles as BundleFile[] ?? bundleFiles.ToArray();
            if (enumerable.Count() != 0)
            {
                path = enumerable.First().IncludedVirtualPath;
            }
            var seajs = new RootModule(path, context, Combine)
            {
                AbsolutePath = context.BundleVirtualPath
            };
            string subContent = seajs.BuildContent(bundleContent);
            return base.ApplyTransforms(context, subContent, enumerable);
        }
    }
}