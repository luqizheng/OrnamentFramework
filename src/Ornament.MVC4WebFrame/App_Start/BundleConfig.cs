using System.IO;
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
            CombineSeajsModule = true;
            bundles.UseCdn = true;
            var registryParty = new VoidFunc<BundleCollection>[]
            {
                GlobalStyle,
                CodeStyle,
                Fx,
                BizRelative,
                RegistryCtrl,
                Comp
            };

            foreach (var item in registryParty)
            {
                item.Invoke(bundles);
            }

            var manager = new ScriptsFolderManager();
            manager.RegisterBundles(bundles);
        }

        private static void Comp(BundleCollection t1)
        {
            t1.Add(new ScriptBundle("~/Components/json2.js").Include("~/Scripts/Components/json2.js"));
        }

        private static void Fx(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/bundles/jquery.js")
                .Include("~/Scripts/fx/jquery-{version}.js"));

            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/bootstrap.js")
                .Include("~/Scripts/fx/bootstrap.js"));

            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/jqueryui.js", "jQuery.fn.spinner")
                .Include("~/Scripts/fx/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/Scripts/avalon.js")
                .Include("~/Scripts/Components/avalon.js"));
            bundles.Add(
                new SeajsBundle("~/Scripts/_appLayout.js", CombineSeajsModule).Include(
                    "~/Scripts/Modules/Views/_appLayout.js"));
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