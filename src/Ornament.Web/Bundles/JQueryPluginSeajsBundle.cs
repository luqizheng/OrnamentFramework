using System.Collections.Generic;
using System.Web.Optimization;

namespace Ornament.Web.Bundles
{
    /// <summary>
    ///     自动把plugin 变为 seajs的 cmd模块，前提是jquery必须是的alias是 jquery ，注意大小写。
    /// </summary>
    public class JQueryPluginSeajsBundle : ScriptBundle
    {
        private readonly string[] _dependIds;

        public JQueryPluginSeajsBundle(string virtualPath)
            : base(virtualPath)
        {
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify());
            }
        }

        public JQueryPluginSeajsBundle(string virtualPath, params string[] dependIds)
            : base(virtualPath)
        {
            _dependIds = dependIds;
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify());
            }
        }

        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent,
                                                       IEnumerable<BundleFile> bundleFiles)
        {
            const string wrapper =
                @"define(function(require){{
{1}
    return function(jQuery){{
        {0}
    }}
}})";

            string requires;
            if (_dependIds != null && _dependIds.Length != 0)
            {
                requires = "require('" + string.Join("');require(''", _dependIds) + "')";
            }
            else
            {
                requires = "";
            }

            string replaceContent = string.Format(wrapper, bundleContent, requires);
            return base.ApplyTransforms(context, replaceContent, bundleFiles);
        }
    }
}