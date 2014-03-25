﻿using System.Web.Optimization;
using Ornament.Web;
using Ornament.Web.Bundles;
using Ornament.Web.Bundles.Config;
using Ornament.Web.SeajsModules;
using Qi;
using SeajsBundles;
using SeajsBundles.JqueryBundles;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace Ornament.MVCWebFrame
{
    public class BundleConfig
    {

        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            OrnamentContext.Configuration.SetSeajsCombine(true);
            bundles.UseCdn = true;
            var registryParty = new VoidFunc<BundleCollection>[]
            {
                GlobalStyle,
                CodeStyle,
                Fx,
                RegistryCtrl,
                Comp,
                SeajsModules
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
            t1.Add(new ScriptBundle("~/Scripts/json2.js").Include("~/Scripts/Components/json2.js"));
            SeajsModuleFactory.Instance.ReferenceModules.Add(new ReferenceModule("~/Scripts/json2.js"));
        }

        private static void Fx(BundleCollection bundles)
        {
            bundles.Add(new JQueryBundle("~/bundles/jquery.js")
                .Include("~/Scripts/fx/jquery-{version}.js"));

            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/bootstrap.js", "$.fn.alert")
                .Include("~/Scripts/fx/bootstrap.js"));

            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/jqueryui.js", "jQuery.fn.spinner")
                .Include("~/Scripts/fx/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/Scripts/avalon.js")
                .Include("~/Scripts/Components/avalon.js"));

            bundles.Add(
                new SeajsBundle("~/Scripts/_appLayout.js", OrnamentContext.Configuration.GetSeajsCombine()).Include(
                    "~/Scripts/Modules/Views/_appLayout.js"));


        }


        /*
        /// <summary>
        ///     业务逻辑相关的，全部都需要带有版本号
        /// </summary>
        /// <param name="bundles"></param>
        private static void BizRelative(BundleCollection bundles)
        {
            new SeajsBundle("~/scripts/ctrls/pm.js", CombineSeajsModule).Include("~/Scripts/Modules/Views/Share/pm.js");
        }
        */

        private static void RegistryCtrl(BundleCollection bundles)
        {
            bundles.Add(
                new SeajsBundle("~/scripts/ctrls/form.js", OrnamentContext.Configuration.GetSeajsCombine()).Include(
                    "~/Scripts/Modules/Views/Share/form.js"));
        }

        /// <summary>
        ///     每个Page对应一个 js，冲这里做映射
        /// </summary>
        /// <param name="bundles"></param>
        private static void SeajsModules(BundleCollection bundles)
        {
            var file = new DirectorySingleScriptFileRegistry("~/Scripts/Modules/", "~/Scripts/", OrnamentContext.Configuration.GetSeajsCombine())
            {
                LogFile = "/Log/modual.log"
            };
            file.Handle(bundles);
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