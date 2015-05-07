using System.Web.Optimization;
using CombineJsBundles;

namespace Ornament.Web.PortableAreas.JsModules
{
    public class EmbedBundle : CombineJsBundle
    {
        private readonly IBundleBuilder _bulder;

        public EmbedBundle(string virtualPath, string areaName)
            : base(virtualPath)
        {
            AreaName = areaName;
            _bulder = new EmbeddedBuilder();
        }

        public string AreaName { get; set; }

        public override IBundleBuilder Builder
        {
            get { return _bulder; }
        }
    }
}