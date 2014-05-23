using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Web.Optimization;
using System.Web.UI.WebControls;
using SeajsBundles.JqueryBundles;

namespace Ornament.Web.Bundles.Config
{
    public class SeajsJqueryPlugin : BaseScriptsManager
    {
        public SeajsJqueryPlugin(string searchDirPath)
            : base(searchDirPath, searchDirPath)
        {
        }

        protected override string ExtendFileName
        {
            get { return "*.js|*.css"; }
        }

        protected override void Handle(BundleCollection bundles, string bundleName, StreamWriter log,
            params string[] includeVirtualPathes)
        {
            if (bundleName.ToLower().EndsWith(".min.js"))
            {
                log.WriteLine("//{0},", bundleName);
                return;
            }
            var fileInfo = new FileInfo(bundleName);
            var bundleFileInfo = new FileInfo(bundleName);

            bool isCss = fileInfo.Name.EndsWith(".css");
            bool isJs = fileInfo.Name.StartsWith("jquery.") && fileInfo.Name.EndsWith(".js");

            if (!isCss && !isJs)
                return;


            int intPos = bundleName.LastIndexOf("/", StringComparison.Ordinal);

            bundleName = bundleName.Substring(0, intPos) + "/"
                         + Regex.Replace(bundleFileInfo.Name, @"(jquery\.)", "");



            Bundle bundle = null;
            if (isCss)
            {
                var styleBundle = new StyleBundle(bundleName);
                var trans = new CssRewriteUrlTransform();
                foreach (var file in includeVirtualPathes)
                {
                    styleBundle.Include(file, trans);
                }
                bundle = styleBundle;
            }
            else
            {
                bundle = new JQueryPluginSeajsBundle(bundleName);
                bundle.Include(includeVirtualPathes);
            }
            bundles.Add(bundle);


            log.WriteLine("\"{0}\":\"{1}\",",
                Regex.Replace(bundleFileInfo.Name, @"(jquery\.)|(-[\d.]+\d)", "", RegexOptions.IgnoreCase)
                    .Replace(".js", ""),
                bundleName.Replace("~/", "/"));
        }

        protected override bool IsCombine(DirectoryInfo directoryInfo, StreamWriter log)
        {
            return directoryInfo.Name.ToLower().Contains("jquery.");
        }
    }
}