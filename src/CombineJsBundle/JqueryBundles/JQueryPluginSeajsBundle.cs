using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Optimization;
using SeajsBundles;

namespace CombineJs.JqueryBundles
{
    /// <summary>
    ///     自动把plugin 变为 seajs的 cmd模块，前提是jquery必须是的alias是 jquery ，注意大小写。
    /// </summary>
    public class JQueryPluginSeajsBundle : ScriptBundle
    {
        private readonly string[] _dependIds;
        private string _pluginName;

        public JQueryPluginSeajsBundle(string virtualPath)
            : base(virtualPath)
        {
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new CommonJsMinify());
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="virtualPath"></param>
        /// <param name="pluginName">please input "$.fn.XXX" or $.xxxx, in order to avoid duplicate init.</param>
        public JQueryPluginSeajsBundle(string virtualPath, string pluginName)
            : base(virtualPath)
        {
            _pluginName = pluginName;
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new CommonJsMinify());
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="virtualPath"></param>
        /// <param name="dependIds"></param>
        public JQueryPluginSeajsBundle(string virtualPath, string[] dependIds)
            : base(virtualPath)
        {
            _dependIds = dependIds;
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new CommonJsMinify());
            }
        }

        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent,
            IEnumerable<BundleFile> bundleFiles)
        {
            if (_pluginName == null)
            {
                Match v = Regex.Match(bundleContent, @"\.fn.([A-z0-9_]+)\s+=");
                if (v.Success)
                {
                    _pluginName = "jQuery.fn." + v.Groups[1];
                }
            }
            string pluginAvoidDuplicate = _pluginName != null ? string.Format("if({0}){{ return; }}", _pluginName) : "";

            const string wrapper =
                @"define(function(require){{
{1}
    return function(jQuery){{
    var $=jQuery;
{2}
        {0}
    }}
}})";

            string requires;
            if (_dependIds != null && _dependIds.Length != 0)
            {
                requires = string.Format("require('{0}')", string.Join("');require(''", _dependIds));
            }
            else
            {
                requires = "";
            }

            string replaceContent = string.Format(wrapper, bundleContent.Replace("window.jQuery","jQuery"), requires, pluginAvoidDuplicate);
            return base.ApplyTransforms(context, replaceContent, bundleFiles);
        }
    }
}