using System.Web.Optimization;

namespace Ornament.Web.Seajs
{
    public class SeajsEmbedBundle : SeajsBundles.SeajsBundle
    {

        private readonly IBundleBuilder _bulder;

        public override IBundleBuilder Builder
        {
            get
            {
                return _bulder;
            }
        }

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


    }
}
