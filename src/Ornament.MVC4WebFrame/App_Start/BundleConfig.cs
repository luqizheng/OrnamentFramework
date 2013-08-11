using System.IO;
using System.Text.RegularExpressions;
using System.Web.Optimization;
using Ornament.Web.Bundles;
using Qi;

namespace Ornament.MVCWebFrame.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;
            ;
            bundles.UseCdn = true;
            var registryParty = new VoidFunc<BundleCollection>[]
                {
                    GlobalStyle,
                    JQueryPlugin,
                    CodeStyle,
                    Fx,
                    BizRelative,
                    Utility
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
        }

        private static void JQueryPlugin(BundleCollection bundles)
        {
            string searchFolder = ApplicationHelper.MapPath("~/Scripts/plugins");
            foreach (var dirPath in Directory.GetDirectories(searchFolder))
            {
                string[] files = Directory.GetFiles(dirPath, "*.js");
                var virtualFolderNmae = ToVirtualPath(dirPath);
                foreach (string file in files)
                {
                    if (file.ToLower().EndsWith(".min.js"))
                        continue;
                    var fileInfo = new FileInfo(file);
                    if (fileInfo.Name.StartsWith("jquery."))
                    {
                        var path = virtualFolderNmae + "/" + fileInfo.Name;
                        bundles.Add(new JQueryPluginSeajsBundle("~/bundles/" + fileInfo.Name).Include(path));
                    }
                }

                var folders = Directory.GetDirectories(dirPath);
                foreach (var folderPath in folders)
                {
                    var directInfo = new DirectoryInfo(folderPath);
                    string virtualFolderName = ToVirtualPath(folderPath);
                    bundles.Add(new JQueryPluginSeajsBundle("~/bundles/" + directInfo.Name + ".js").Include(virtualFolderName + "/*.js"));
                }
            }
        }
        /// <summary>
        /// 把物理路径改为虚拟路径
        /// </summary>
        /// <param name="fullPath"></param>
        /// <returns></returns>
        private static string ToVirtualPath(string fullPath)
        {
            return fullPath.Replace(ApplicationHelper.PhysicalApplicationPath, "~/").Replace("\\", "/");
        }
       

        /// <summary>
        ///     业务逻辑相关的，全部都需要带有版本号
        /// </summary>
        /// <param name="bundles"></param>
        private static void BizRelative(BundleCollection bundles)
        {
            bundles.Add(new SeajsBundle("~/models/personal-1.0.js").Include("~/Scripts/Models/personal.js"));
            bundles.Add(new SeajsBundle("~/models/membership-1.0.js").Include(@"~/Scripts/Models/Ui/Controls/MemberShip.js"));
            bundles.Add(new SeajsBundle("~/models/pm-1.0.js").Include("~/Scripts/Models/Ui/Controls/pm.js"));
            AutoForPageScripts(bundles);
        }

        /// <summary>
        /// 每个Page对应一个 js，冲这里做映射
        /// </summary>
        /// <param name="bundles"></param>
        private static void AutoForPageScripts(BundleCollection bundles)
        {
            const string str = "~/scripts/models/views/";
            string[] files = Directory.GetFiles(ApplicationHelper.MapPath(str), "*.js", SearchOption.AllDirectories);
            foreach (string file in files)
            {
                var bundleName = ToVirtualPath(file).ToLower().Replace(str.ToLower(), "~/");
                bundles.Add(new SeajsBundle(bundleName).Include(ToVirtualPath(file)));
            }
        }

        private static void Utility(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/Utils.js")
                            .Include("~/Scripts/Util/*.js"));
            bundles.Add(new Bundle("~/Scripts/ckeditor.js").Include("~/Scripts/ckeditor/ckeditor.js"));
        }

        private static void CodeStyle(BundleCollection bundles)
        {
            //Code style registry
            bundles.Add(new ScriptBundle("~/Scripts/CodeStyle")
                            .Include("~/Scripts/Prettify/prettify.js"));
            //.IncludeDirectory("~/Scripts/Prettify/", "*.js", false));
            bundles.Add(new StyleBundle("~/Content/CodeStyle")
                            .Include("~/Content/Prettify/prettify.css", "~/Content/Prettify/desert.css"));
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
            bundles.Add(new StyleBundle("~/Content/plugin")
                            .Include("~/Content/templates/pannonia/css/ornamentExtender.css")
                            .Include("~/Content/templates/pannonia/css/plugins.css")
                            .Include("~/Content/templates/pannonia/css/jquery.custom.css")
                );
        }
    }
}