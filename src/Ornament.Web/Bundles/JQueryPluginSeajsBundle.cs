using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Optimization;

namespace Ornament.Web.Bundles
{
    /// <summary>
    ///     自动把plugin 变为 seajs的 cmd模块，前提是jquery必须是的alias是 jquery ，注意大小写。
    /// </summary>
    public class JQueryPluginSeajsBundle : ScriptBundle
    {
        public JQueryPluginSeajsBundle(string virtualPath)
            : base(virtualPath)
        {
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify(virtualPath));
            }
        }

        public JQueryPluginSeajsBundle(string virtualPath, string cdnPath)
            : base(virtualPath, cdnPath)
        {
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify(virtualPath));
            }
        }

        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent,
            IEnumerable<BundleFile> bundleFiles)
        {

            bundleContent = bundleContent.Replace("(jQuery);", ";") + " })";
            string replaceContent = Regex.Replace(bundleContent, @"\(function \($\)", "define(function (require) { return (function($)");
            return base.ApplyTransforms(context, replaceContent, bundleFiles);

            //return base.ApplyTransforms(context, bundleContent, bundleFiles);
        }


    }
}