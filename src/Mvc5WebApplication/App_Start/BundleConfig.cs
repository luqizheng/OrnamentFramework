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
                    "~/js/libs/jquery-{version}.js");
            jquery.CdnFallbackExpression = "window.jQuery";
            bundles.Add(jquery);

            bundles.Add(new ScriptBundle("~/js/jqueryui").Include("~/js/libs/jquery-ui-{version}.js"));
            bundles.Add(new ScriptBundle("~/js/bootstrap").Include("~/js/bootstrap/bootstrap.min.js"));
            bundles.Add(new ScriptBundle("~/js/avalon").Include("~/js/avalon.js"));
            bundles.Add(new ScriptBundle("~/js/json2.js").Include("~/js/json2.js"));
        }


        private static void GlobalStyle(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/css/global.css").IncludeDirectory("~/css/Custom", "*.css", false));
            bundles.Add(new StyleBundle("~/css/bootstrap.css").Include("~/css/bootstrap.min.css"));
            bundles.Add(new StyleBundle("~/css/font-awesome.css").Include("~/css/font-awesome.min.css"));

        }
    }
}