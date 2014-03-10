using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Web.Optimization;
using SeajsBundles.JqueryBundles;

namespace Ornament.Web.Bundles.Config
{
    public class SeajsJqueryPlugin : BaseScriptsManager
    {
        public SeajsJqueryPlugin(string searchDirPath)
            : base(searchDirPath, "~/bundles/")
        {
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
            if (fileInfo.Name.StartsWith("jquery."))
            {
                int intPos = bundleName.LastIndexOf("/", StringComparison.Ordinal);
                var bundleFileInfo = new FileInfo(bundleName);
                bundleName = bundleName.Substring(0, intPos) + "/"
                             +
                             Regex.Replace(bundleFileInfo.Name, @"(jquery\.)|(-[\d.]+\d)", "", RegexOptions.IgnoreCase);

                bundles.Add(new JQueryPluginSeajsBundle(bundleName).Include(includeVirtualPathes));

                log.WriteLine("\"{0}\":\"{1}\",", (new FileInfo(bundleName).Name.Replace(".js", "")),
                    bundleName.Replace("~/", "/"));
            }
        }

        protected override bool IsCombine(DirectoryInfo directoryInfo, StreamWriter log)
        {
            return directoryInfo.Name.ToLower().Contains("jquery.");
        }
    }
}