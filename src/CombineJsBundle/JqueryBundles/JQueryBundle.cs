using System;
using System.Collections.Generic;
using System.Web.Optimization;
using SeajsBundles;

namespace CombineJs.JqueryBundles
{
    public class JQueryBundle : ScriptBundle
    {
        public JQueryBundle(string virtualPath)
            : base(virtualPath)
        {
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new CommonJsMinify());
            }
        }

        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent,
            IEnumerable<BundleFile> bundleFiles)
        {
            const string makeup = @"define(function(require,exports,module){{  
{0}
  
}})";

            BundleResponse bundleResponse = base.ApplyTransforms(context, String.Format(makeup, bundleContent),
                bundleFiles);

            //bundleResponse.Content = String.Format(makeup, bundleContent);
            return bundleResponse;
        }
    }
}