using System.Web.Optimization;
using CombineJs;

namespace Ornament.Web.SeajsModules
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

        //public string GetContent(string requireId, SeajsEmbedBundle bundle, BundleContext context)
        //{
        //    var builder = Builder as EmbeddedBuilder;
        //    if (builder == null)
        //    {
        //        throw new Exception("builder should be EmbeddedBuilder");
        //    }
        //    return builder.BuildBundleContent(requireId,bundle, context);
        //}

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