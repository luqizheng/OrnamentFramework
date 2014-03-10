using System;
using System.Web.Optimization;
using SeajsBundles;

namespace Ornament.Web.SeajsModules
{
    public class SeajsEmbedBundle : SeajsBundle
    {
        private readonly IBundleBuilder _bulder;

        public SeajsEmbedBundle(string virtualPath, string assemblyRootNameSpace, bool combine)
            : base(virtualPath, combine)
        {
            _bulder = new EmbeddedBuilder(assemblyRootNameSpace);
        }

        public SeajsEmbedBundle(string virtualPath, string assemblyRootNameSpace, string cdnPath)
            : base(virtualPath, cdnPath)
        {
            _bulder = new EmbeddedBuilder(assemblyRootNameSpace);
        }

        public override IBundleBuilder Builder
        {
            get { return _bulder; }
        }

        public string GetContent(string virtualPath)
        {
            var embeddedBuilder = this.Builder as EmbeddedBuilder;
            if(embeddedBuilder!=null)
                return embeddedBuilder.BuildBundleContent(virtualPath);
            throw new Exception("builder should be EmbeddedBuilder");
        }
    }
}