using System.IO;
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
                    JQueryRelative,
                    CodeStyle,
                    SeajsLib,
                    BizRelative,
                    Utility
                };

            foreach (var item in registryParty)
            {
                item.Invoke(bundles);
            }
        }

        private static void SeajsLib(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/bundles/jquery.js").Include("~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap.js").Include("~/Scripts/bootstrap/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui.js")
                .Include("~/Scripts/jquery-ui-{version}.js")
                .Include("~/Scripts/compatibles/jqueryui-{version}.js"));
        }

        private static void JQueryRelative(BundleCollection bundles)
        {
            bundles.Add(
                new ScriptBundle("~/bundles/datePicker.js").Include("~/Scripts/datePicker/bootstrap-datepicker.js"));

            //input forms;
            bundles.Add(new Bundle("~/bundles/inputmask.js", new JsMinify()).Include(
                "~/Scripts/plugins/forms/jquery.inputmask/*.js")
                                                                            .Include(
                                                                                "~/Scripts/compatibles/inputMask-{version}.js"));
            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/jquery.collapsible.js").Include("~/scripts/plugin/ui/jquery.collapsible.js"));
            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/jqueryval.js").Include("~/Scripts/jquery.validate*"));
            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/unobtrusive.js").Include("~/Scripts/jquery.unobtrusive*"));
            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/tmpl.js").Include("~/Scripts/jquery.tmpl.js"));

            
            
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/knockout.js").Include("~/Scripts/knockout-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/json2.js").Include("~/Scripts/json2.js"));
            bundles.Add(
                new Bundle("~/bundles/toDictionary.js", new JsMinify()).Include("~/scripts/jquery.toDictionary.js"));

            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/jquery.uniform.js").Include("~/Scripts/plugins/ui/jquery.uniform.js"));
            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/jquery.easytabs.js")
                .Include("~/Scripts/plugins/ui/jquery.easytabs.js"));
            //form
            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/form.js").Include("~/Scripts/plugins/forms/jquery.form.js"));
            bundles.Add(
                new JQueryPluginSeajsBundle("~/bundles/collapsible.js").Include("~/Scripts/plugins/ui/jquery.collapsible.js"));
            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/jgrowl.js").Include("~/Scripts/plugins/ui/jquery.jgrowl.js"));

            //time picker ;
            bundles.Add(new JQueryPluginSeajsBundle("~/bundles/timepicker.js")
                            .Include("~/Scripts/plugins/ui/jquery.timepicker-{version}.js")
                            .Include("~/Scripts/compatibles/timePicker-{version}.js"));
        }

        /// <summary>
        ///     业务逻辑相关的，全部都需要带有版本号
        /// </summary>
        /// <param name="bundles"></param>
        private static void BizRelative(BundleCollection bundles)
        {
            //Memberships


            /*
             bundles.Add(new SeajsBundle("~/models/role.js").Include("~/Scripts/Models/Base/Memberships/role-{version}.js"));
             bundles.Add(
                 new SeajsBundle("~/models/userGroup.js").Include("~/Scripts/Models/Base/Memberships/userGroup-{version}.js"));
             bundles.Add(new SeajsBundle("~/models/org.js").Include("~/Scripts/Models/Base/Memberships/org-{version}.js"));
             //bundles.Add(new SeajsBundle("~/models/message.js").Include("~/Scripts/Models/Messages/msg-{version}.js"));

             bundles.Add(new SeajsBundle("~/models/ui/membership.js")
                 .Include(@"~/Scripts/Models/Biz/Ui/MemberShip.js"));


             //PersonalMessage
             bundles.Add(new SeajsBundle("~/models/pm.js").Include("~/Scripts/Models/Base/Messages/pm-{version}.js"));

             bundles.Add(new SeajsBundle("~/models/personal.js").Include("~/Scripts/Models/Base/Memberships/personal-{version}.js"));

             //Util
             bundles.Add(new SeajsBundle("~/models/util/select2Helper.js")
                             .Include("~/Scripts/Models/Base/Util/select2Helper-1.0.js"));*/

            /*bundles.Add(
                new SeajsBundle("~/models/user-1.0.js").Include("~/Scripts/Models/Base/Memberships/user-{version}.js"));*/
            bundles.Add(new SeajsBundle("~/models/personal-1.0.js").Include("~/Scripts/Models/personal.js"));
            bundles.Add(new SeajsBundle("~/models/membership-1.0.js").Include(@"~/Scripts/Models/Ui/Controls/MemberShip.js"));
            bundles.Add(new SeajsBundle("~/models/pm-1.0.js").Include("~/Scripts/Models/Ui/Controls/pm.js"));
            AutoForPageScripts(bundles);
        }

        private static void AutoForPageScripts(BundleCollection bundles)
        {
            const string str = "\\Scripts\\Models\\Ui\\Views\\";
            string[] files = Directory.GetFiles(ApplicationHelper.MapPath(str), "*.js", SearchOption.AllDirectories);
            foreach (string file in files)
            {
                int pathPost = file.ToLower().IndexOf(str.ToLower());
                string path = file.Substring(pathPost + str.Length).Replace('\\', '/').ToLower();
                bundles.Add(new SeajsBundle("~/scripts/" + path).Include("~/" + file.Substring(pathPost)));
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