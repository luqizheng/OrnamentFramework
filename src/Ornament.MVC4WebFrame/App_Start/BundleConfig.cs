﻿using System.Web.Optimization;
using Qi;

namespace Ornament.MVCWebFrame.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            var registryParty = new VoidFunc<BundleCollection>[]
                {
                    GlobalStyle,
                    JQueryRelative,
                    CommonComponent,
                    CodeStyle,
                    InputMask,
                    RichEditor,
                    SeaJs,
                };

            foreach (var item in registryParty)
            {
                item.Invoke(bundles);
            }
            BundleTable.EnableOptimizations = true;
            bundles.UseCdn = true;
            //bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
        }

        private static void SeaJs(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/seajs").Include("~/Scripts/seajs-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/plugin-shim.js").Include("~/Scripts/plugin-shim.js"));
        }

        private static void InputMask(BundleCollection bundles)
        {
            
            bundles.Add(new ScriptBundle("~/bundles/InputMasker")
                            .Include("~/Scripts/InputMasker/*.js"));
        }

        private static void JQueryRelative(BundleCollection bundles)
        {
            bundles.Add(
                new ScriptBundle("~/bundles/jquery", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js").
                    Include("~/Scripts/jquery-{version}.js"));

            
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include("~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/ubo").Include("~/Scripts/jquery.unobtrusive*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/ko").Include("~/Scripts/knockout-{version}.js", "~/Scripts/jquery.tmpl.js"));
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

        private static void RichEditor(BundleCollection bundles)
        {
            //Richer editor
            bundles.Add(new ScriptBundle("~/Scripts/Editor")
                            .IncludeDirectory("~/Scripts/wysiwyg/", "*.js", true)
                );

            bundles.Add(new StyleBundle("~/Content/Editor")
                            .Include("~/Content/wysiwyg/jquery.wysiwyg.css"));
        }

        private static void CommonComponent(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/bundles/component", new JsMinify())
                            .Include(
                                "~/scripts/combine/global.js",
                                "~/scripts/combine/permission.js",
                                "~/scripts/combine/compatibleBootStrap.js",
                                "~/scripts/combine/dialog.js",
                                "~/scripts/combine/string.js",
                                "~/scripts/combine/bootstrap.js",
                                "~/Scripts/datePicker/bootstrap-datepicker.js",
                                "~/Scripts/jQuery.multiChoice.js",
                                "~/Scripts/jQuery.tmpl.js",
                                "~/scripts/combine/start.js"
                            )
                );
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