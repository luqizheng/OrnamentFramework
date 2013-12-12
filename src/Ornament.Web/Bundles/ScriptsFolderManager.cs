using System.Web.Optimization;
using Ornament.Web.Bundles.Config;

namespace Ornament.Web.Bundles
{
    public class ScriptsFolderManager
    {
        private SeajsJqueryPlugin _seajsJqueryPlugin;

        public SeajsJqueryPlugin SeajsJqueryPlugin
        {
            get
            {
                return _seajsJqueryPlugin ?? (_seajsJqueryPlugin = new SeajsJqueryPlugin("~/Scripts/plugins"));
            }
        }

        public void RegisterBundles(BundleCollection bundles)
        {
            SeajsJqueryPlugin.Handle(bundles);
        }
    }
}