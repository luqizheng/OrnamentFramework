using System.Web.Optimization;
using Qi;

namespace WebApplication
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;
            BundleTable.Bundles.UseCdn = true;
            var registryParty = new VoidFunc<BundleCollection>[]
            {
                GlobalStyle,
                Fx
            };

            foreach (var item in registryParty)
            {
                item.Invoke(bundles);
            }
        }



        private static void Fx(BundleCollection bundles)
        {
            var jquery =
                new ScriptBundle("~/js/jquery", "http://libs.baidu.com/jquery/2.0.2/jquery.js").Include(
                    "~/scripts/libs/jquery-{version}.js");
            jquery.CdnFallbackExpression = "window.jQuery";
            bundles.Add(jquery);

            bundles.Add(new ScriptBundle("~/Scripts/jqueryui.js").Include("~/scripts/libs/jquery-ui-1.11.2.js"));
            //bundles.Add(new ScriptBundle("~/Scripts/bootstrap.js", "http://cdn.bootcss.com/bootstrap/3.2.0/js/bootstrap.min.js").Include("~/scripts/bootstrap/bootstrap.min.js"));
            bundles.Add(new ScriptBundle("~/Scripts/bootstrap.js").Include("~/scripts/bootstrap/bootstrap.min.js"));
            bundles.Add(new ScriptBundle("~/Scripts/avalon").Include("~/scripts/avalon.js"));
            bundles.Add(new ScriptBundle("~/Scripts/json2.js").Include("~/scripts/json2.js"));
            bundles.Add(new ScriptBundle("~/scripts/main.js").IncludeDirectory("~/Scripts/Modules", "*.js"));


            //float chat
            bundles.Add(new ScriptBundle("~/Scripts/float.js").IncludeDirectory("~/Scripts/plugin/flot", "*./js"));
        }


        private static void GlobalStyle(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/css/global.css").IncludeDirectory("~/css/Custom", "*.css", false));
            bundles.Add(new StyleBundle("~/css/bootstrap.css").Include("~/css/bootstrap.min.css"));
            bundles.Add(new StyleBundle("~/css/font-awesome.css").Include("~/css/font-awesome.min.css"));

        }
    }
}