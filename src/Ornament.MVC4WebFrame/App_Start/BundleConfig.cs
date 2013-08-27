using System.IO;
using System.Text.RegularExpressions;
using System.Web.Optimization;
using Ornament.Web.Bundles;
using Qi;

namespace Ornament.MVCWebFrame.App_Start
{
    public class BundleConfig
    {
        public static bool CombineSeajsModule = false;
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            bundles.UseCdn = true;
            var registryParty = new VoidFunc<BundleCollection>[]
                {
                    GlobalStyle,
                    JQueryPlugin,
                    CodeStyle,
                    Fx,
                    BizRelative, RegistryCtrl
                };

            foreach (var item in registryParty)
            {
                item.Invoke(bundles);
            }
        }

        private static void Fx(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/bundles/jquery.js")
                            .Include("~/Scripts/fx/jquery-{version}.js"));

            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/bootstrap.js", "/bundles/jquery.js")
                            .Include("~/Scripts/fx/bootstrap.js"));

            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/jqueryui.js")
                            .Include("~/Scripts/fx/jquery-ui-{version}.js")
                            .Include("~/Scripts/fx/compatibles/jqueryui-{version}.js"));

            bundles.Add(
                new SeajsBundle("~/_appLayout.js", CombineSeajsModule).Include("~/Scripts/Modules/Views/_appLayout.js"));
        }

        private static void JQueryPlugin(BundleCollection bundles)
        {
#if DEBUG
            using (var writer = new StreamWriter(ApplicationHelper.MapPath("~/log/jqPlugin.txt")))
            {
#endif
                string searchFolder = ApplicationHelper.MapPath("~/Scripts/plugins");
                foreach (string dirPath in Directory.GetDirectories(searchFolder))
                {
                    string[] files = Directory.GetFiles(dirPath, "*.js");
                    string virtualFolderNmae = ToVirtualPath(dirPath);
                    foreach (string file in files)
                    {
                        if (file.ToLower().EndsWith(".min.js"))
                            continue;
                        var fileInfo = new FileInfo(file);
                        if (fileInfo.Name.StartsWith("jquery."))
                        {
                            string path = virtualFolderNmae + "/" + fileInfo.Name;
                            string bundleName = "~/bundles/" +
                                                Regex.Replace(fileInfo.Name, @"(jquery\.)|(-[\d.]+\d)", "",
                                                              RegexOptions.IgnoreCase);
                            bundles.Add(new JQueryPluginSeajsBundle(bundleName).Include(path));
#if DEBUG
                            writer.WriteLine("\"{0}\":\"{1}\",", (new FileInfo(bundleName).Name.Replace(".js", "")),
                                             bundleName.Replace("~/", "/"));
#endif
                        }
#if DEBUG
                    }
#endif

                    string[] folders = Directory.GetDirectories(dirPath);
                    foreach (string folderPath in folders)
                    {
                        var directInfo = new DirectoryInfo(folderPath);

                        if (!directInfo.Name.StartsWith("jquery."))
                        {
                            continue;
                        }

                        string virtualFolderName = ToVirtualPath(folderPath);
                        string bundleName = "~/bundles/" + directInfo.Name.Replace("jquery.", "") + ".js";
                        bundles.Add(
                            new JQueryPluginSeajsBundle(bundleName).Include(
                                virtualFolderName +
                                "/*.js"));
#if DEBUG
                        writer.WriteLine("\"{0}\":\"{1}\",", directInfo.Name.Replace(".js", ""),
                                         bundleName.Replace("~/", "/"));
#endif
                    }
                }
            }
        }

        /// <summary>
        ///     把物理路径改为虚拟路径
        /// </summary>
        /// <param name="fullPath"></param>
        /// <returns></returns>
        private static string ToVirtualPath(string fullPath)
        {
            return fullPath.Replace(ApplicationHelper.PhysicalApplicationPath, "~/").Replace("////", "/");
        }


        /// <summary>
        ///     业务逻辑相关的，全部都需要带有版本号
        /// </summary>
        /// <param name="bundles"></param>
        private static void BizRelative(BundleCollection bundles)
        {

            new SeajsBundle("~/scripts/ctrls/pm.js", CombineSeajsModule).Include("~/Scripts/Modules/Views/Share/pm.js");
            AutoForPageScripts(bundles);
        }

        private static void RegistryCtrl(BundleCollection bundles)
        {
            bundles.Add(
                new SeajsBundle("~/scripts/ctrls/memberships.js", CombineSeajsModule).Include(
                    "~/Scripts/Modules/Views/Share/memberships.js"));

            bundles.Add(
                new SeajsBundle("~/scripts/ctrls/form.js", CombineSeajsModule).Include(
                    "~/Scripts/Modules/Views/Share/form.js"));
        }

        /// <summary>
        ///     每个Page对应一个 js，冲这里做映射
        /// </summary>
        /// <param name="bundles"></param>
        private static void AutoForPageScripts(BundleCollection bundles)
        {
            using (var writer = new StreamWriter(ApplicationHelper.MapPath("~/log/page.txt")))
            {
                const string str = "~/Scripts/Modules/Views/";
                string[] files = Directory.GetFiles(ApplicationHelper.MapPath(str), "*.js", SearchOption.AllDirectories);
                foreach (string file in files)
                {
                    string bundleName = ToVirtualPath(file).Replace("\\", "/").ToLower().Replace(str.ToLower(), "~/");
                    bundles.Add(new SeajsBundle(bundleName, CombineSeajsModule).Include(ToVirtualPath(file)));
                    writer.WriteLine("{0}={1}", bundleName, file);
                }
            }
        }


        private static void CodeStyle(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Components/CodeStyle")
                            .Include("~/scripts/Components/Prettify/prettify.js"));
        }


        private static void GlobalStyle(BundleCollection bundles)
        {
            /*
             * First time, I want complie Less file on fly, 
             * but it's havn'e any intellisences in vs.net 2010, because 2010 can't support LESS
             * Now, I have to use MSBuild to compile Less file after build.
             * Please run watch.bat in tools folder.
             */

            //following code disabled .
            /*var min = new LessMinify();
            var bundler = new Bundle("~/Content/global", min);
            string combinPath = ApplicationHelper.MapPath("~/Content/combine");
            if (Directory.Exists(combinPath))
            {
                bundler.IncludeDirectory("~/Content/combine", "*.css");
            }
            bundler.Include("~/Content/less/global.less");
            //bootstrap css
            bundles.Add(bundler);*/

            //Now use pre-compiler
            bundles.Add(new StyleBundle("~/Content/global").Include("~/Content/Combine/global.css"));
          
        }
    }
}