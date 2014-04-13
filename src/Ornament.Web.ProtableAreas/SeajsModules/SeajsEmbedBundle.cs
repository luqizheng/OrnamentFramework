namespace Ornament.Web.SeajsModules
{
    using SeajsBundles;
    using System;
    using System.Runtime.CompilerServices;
    using System.Web.Optimization;

    public class SeajsEmbedBundle : SeajsBundle
    {
        private readonly IBundleBuilder _bulder;

        public SeajsEmbedBundle(string virtualPath, string areaName, bool combine) : base(virtualPath, combine)
        {
            this.AreaName = areaName;
            this._bulder = new EmbeddedBuilder();
        }

        public SeajsEmbedBundle(string virtualPath, string areaName, string cdnPath) : base(virtualPath, cdnPath)
        {
            this.AreaName = areaName;
            this._bulder = new EmbeddedBuilder();
        }

        public string GetContent(string virtualPath)
        {
            EmbeddedBuilder builder = this.Builder as EmbeddedBuilder;
            if (builder == null)
            {
                throw new Exception("builder should be EmbeddedBuilder");
            }
            return builder.BuildBundleContent(virtualPath);
        }

        public string AreaName { get; set; }

        public override IBundleBuilder Builder
        {
            get
            {
                return this._bulder;
            }
        }
    }
}

