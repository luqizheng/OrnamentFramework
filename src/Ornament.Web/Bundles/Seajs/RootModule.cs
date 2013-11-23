using System.Text;
using System.Web;
using System.Web.Optimization;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    ///     Moudle
    /// </summary>
    public class RootModule : BaseCombineModule
    {
        public RootModule(BundleContext context,string filename, string virtualPath, bool combine)
            : base(context,filename, virtualPath, combine)
        {
        }

        public string BuildContent(string content)
        {
            var modelets = new ModualIdSets();
            modelets.Add(new ReferenceModule(VirtualPath.TrimStart('~')));
            return base.BuildContent(content, modelets, new ModuleCollection());
        }

        protected override StringBuilder RebuildDefinedHeader(string content, ModualIdSets moduleIdList)
        {
            //对于root module来说，并不需要重新整理过define 这个function的内容，因此直接返回。
            return new StringBuilder(content);
        }

        protected override string GetOutputModuleId(ModualIdSets moduleIdList)
        {
            return VirtualPathUtility.ToAbsolute(VirtualPath);
        }

        protected override ReferenceModule GetModual(string srcRequireModualId, ModualIdSets moduleIdSets,
                                                     ModuleCollection globalReferenceModules, out bool combinedHere)
        {
            ReferenceModule result = base.GetModual(srcRequireModualId, moduleIdSets, globalReferenceModules,
                                                    out combinedHere);
            if (combinedHere)
                combinedHere = Combine;
            return result;
        }
    }
}