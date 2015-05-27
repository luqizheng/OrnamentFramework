using System;
using System.Web.Optimization;
using Ornament;
using Ornament.Web;
using Qi;

namespace WebApplication
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;
            BundleTable.Bundles.UseCdn = false;
            OrnamentContext.Configuration.SetSeajsCombine(true);
            var registryParty = new Action<BundleCollection>[]
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
            Bundle jquery =
                new ScriptBundle("~/js/jquery", "http://libs.baidu.com/jquery/2.1.3/jquery.js").Include(
                    "~/scripts/libs/jquery-{version}.js");
            jquery.CdnFallbackExpression = "window.jQuery";
            bundles.Add(jquery);

            bundles.Add(new ScriptBundle("~/js/bootstrap").Include("~/Scripts/bootstrap/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/js/socketio", "https://cdn.socket.io/socket.io-1.3.2.js")
                .Include("~/Scripts/libs/socket.io-{version}.js"));
            bundles.Add(new ScriptBundle("~/js/jqueryui").Include("~/scripts/libs/jquery-ui-{version}.js"));
            bundles.Add(new ScriptBundle("~/js/avalon").Include("~/scripts/avalon.js"));
            bundles.Add(new ScriptBundle("~/js/json2").Include("~/scripts/json2.js"));
            bundles.Add(new ScriptBundle("~/js/main.js").IncludeDirectory("~/Scripts/Modules", "*.js"));

            bundles.Add(new ScriptBundle("~/js/moment").Include("~/scripts/plugin/moment/moment.js"));
            //float chat
            bundles.Add(new ScriptBundle("~/js/float").IncludeDirectory("~/Scripts/plugin/flot", "*.js"));

            //smark chai
            bundles.Add(new ScriptBundle("~/js/smarkchat")
                .Include("~/Scripts/smart-chat-ui/smart.chat.ui.js")
                .Include("~/Scripts/smart-chat-ui/smart.chat.manager.js")
                );
        }


        private static void GlobalStyle(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/css/global").IncludeDirectory("~/css/Custom", "*.css", false));
            bundles.Add(new StyleBundle("~/css/bootstrap").Include("~/css/bootstrap.css"));
            bundles.Add(new StyleBundle("~/css/font-awesome").Include("~/css/font-awesome.css"));
        }
    }
}