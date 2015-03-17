using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;
using CombineJs.Modules;

namespace CombineJs
{
    /// <summary>
    ///     Module
    /// </summary>
    public class CombineJsBundle : ScriptBundle
    {
        public CombineJsBundle(string virtualPath)
            : this(virtualPath, null)
        {
        }

        public CombineJsBundle(string virtualPath, string cdnPath)
            : base(virtualPath, cdnPath)
        {
        }


        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent,
            IEnumerable<BundleFile> bundleFiles)
        {
            if (BundleTable.EnableOptimizations)
            {
                for (int i = 0; i < Transforms.Count; i++)
                {
                    if (Transforms[i] is JsMinify)
                    {
                        Transforms[i] = new CommonJsMinify();
                        break;
                    }
                }
            }
            else
            {
                Transforms.Clear();
            }
            string path = Path;
            BundleFile[] enumerable = bundleFiles as BundleFile[] ?? bundleFiles.ToArray();
            if (enumerable.Count() != 0)
            {
                path = enumerable.First().IncludedVirtualPath;
            }
            ModuleFactory factory = ModuleFactory.Create(context, true);
            /*var seajs = new RootModule(path, context, Combine)
            {
                AbsolutePath = context.BundleVirtualPath
            };*/
            string subContent = factory.Build(path, bundleContent);
            return base.ApplyTransforms(context, subContent, enumerable);
        }
    }
}