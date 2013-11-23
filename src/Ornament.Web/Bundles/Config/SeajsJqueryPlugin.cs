using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Web.Optimization;

namespace Ornament.Web.Bundles.Config
{
    public class SeajsJqueryPlugin : BaseScriptsManager
    {
        public SeajsJqueryPlugin(string searchDirPath)
            : base(searchDirPath, "~/bundles/")
        {
        }

        protected override void Handle(BundleCollection bundles, string virtualPath,
                                       string bundleName, StreamWriter log)
        {
            if (virtualPath.ToLower().EndsWith(".min.js"))
            {
                log.WriteLine("Skip {0},", virtualPath);
                return;
            }
            var fileInfo = new FileInfo(virtualPath);
            if (fileInfo.Name.StartsWith("jquery."))
            {
                int intPos = bundleName.LastIndexOf("/", StringComparison.Ordinal);
                var bundleFileInfo = new FileInfo(bundleName);
                bundleName = bundleName.Substring(0, intPos) + "/"
                             +
                             Regex.Replace(bundleFileInfo.Name, @"(jquery\.)|(-[\d.]+\d)", "", RegexOptions.IgnoreCase);

                bundles.Add(new JQueryPluginSeajsBundle(bundleName).Include(virtualPath));

                log.WriteLine("\"{0}\":\"{1}\",", (new FileInfo(bundleName).Name.Replace(".js", "")),
                              bundleName.Replace("~/", "/"));
            }
        }

        protected override bool HandleFolder(BundleCollection bundles, DirectoryInfo directInfo,
                                             string virtualFolderName, StreamWriter logWriter)
        {
            if (!directInfo.Name.StartsWith("jquery."))
            {
                //继续查找
                return true;
            }

            string bundleName = string.Format("~/bundles/{0}.js", directInfo.Name.Replace("jquery.", ""));
            bundles.Add(
                new JQueryPluginSeajsBundle(bundleName).Include(
                    virtualFolderName +
                    "/*.js"));

            logWriter.WriteLine("\"{0}\":\"{1}\",", directInfo.Name.Replace(".js", ""),
                                bundleName.Replace("~/", "/"));
            return false;
        }
    }
}