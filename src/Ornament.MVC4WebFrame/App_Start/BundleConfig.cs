using System.Web.Optimization;
using Qi;

namespace Ornament.MVCWebFrame.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;
            bundles.UseCdn = true;
            var registryParty = new VoidFunc<BundleCollection>[]
                {
                    GlobalStyle,
                    JQueryRelative,
                    CodeStyle,
                    RichEditor,
                    SeajsLib,
                };

            foreach (var item in registryParty)
            {
                item.Invoke(bundles);
            }

            //bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
        }

        private static void SeajsLib(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/bundles/jquery.js").Include("~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap.js").Include("~/Scripts/bootstrap/bootstrap.js"));
        }

        private static void JQueryRelative(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/datePicker.js").Include("~/Scripts/datePicker/bootstrap-datepicker.js"));
            bundles.Add(new Bundle("~/bundles/inputmask", new JsMinify()).Include("~/Scripts/InputMasker/*.js"));
            bundles.Add(new Bundle("~/bundles/jqueryval.js", new JsMinify()).Include("~/Scripts/jquery.validate*"));
            bundles.Add(new ScriptBundle("~/bundles/unobtrusive.js").Include("~/Scripts/jquery.unobtrusive*"));
            bundles.Add(new ScriptBundle("~/bundles/tmpl.js").Include("~/Scripts/jquery.tmpl.js"));
            //bundles.Add(new ScriptBundle("~/bundles/multiChoice.js").Include("~/scripts/jQuery.multiChoice.js"));
            bundles.Add(new ScriptBundle("~/bundles/periodDailog.js").Include("~/scripts/periodDailog/*.js"));
            //bundles.Add(new Bundle("~/bundles/dialog.js", new JsMinify()).Include("~/scripts/dialogs/*.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/knockout.js").Include("~/Scripts/knockout-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/json2.js").Include("~/Scripts/json2.js"));
            bundles.Add(new Bundle("~/bundles/toDictionary.js", new JsMinify()).Include("~/scripts/jquery.toDictionary.js"));


            bundles.Add(new ScriptBundle("~/bundles/easytabs.js").Include("~/Scripts/plugins/ui/jquery.easytabs.js"));
            //form
            bundles.Add(new ScriptBundle("~/bundles/form.js").Include("~/Scripts/plugins/forms/jquery.form.js"));

            bundles.Add(
                new ScriptBundle("~/bundles/collapsible.js").Include("~/Scripts/plugins/ui/jquery.collapsible.js"));


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