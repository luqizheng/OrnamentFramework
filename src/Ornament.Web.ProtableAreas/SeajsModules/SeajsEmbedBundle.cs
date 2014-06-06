using System;
using System.Web.Optimization;
using SeajsBundles;

namespace Ornament.Web.SeajsModules
{
    public class SeajsEmbedBundle : SeajsBundle
    {
        private readonly IBundleBuilder _bulder;

        public SeajsEmbedBundle(string virtualPath, string areaName, bool combine) : base(virtualPath, combine)
        {
            AreaName = areaName;
            _bulder = new EmbeddedBuilder();
        }

        public SeajsEmbedBundle(string virtualPath, string areaName, string cdnPath) : base(virtualPath, cdnPath)
        {
            AreaName = areaName;
            _bulder = new EmbeddedBuilder();
        }

        public string AreaName { get; set; }

        public override IBundleBuilder Builder
        {
            get { return _bulder; }
        }

        public string GetContent(string virtualPath)
        {
            var builder = Builder as EmbeddedBuilder;
            if (builder == null)
            {
                throw new Exception("builder should be EmbeddedBuilder");
            }
            return builder.BuildBundleContent(virtualPath);
        }

        public override BundleResponse GenerateBundleResponse(BundleContext context)
        {
            return base.GenerateBundleResponse(context);
        }

        public override void UpdateCache(BundleContext context, BundleResponse response)
        {
            base.UpdateCache(context, response);
        }
    }
}