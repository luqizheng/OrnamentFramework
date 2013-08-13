using System.Web;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    ///     Moudle
    /// </summary>
    public class RootModule : BaseCombineModule
    {
       

        public RootModule(string filename, string virtualPath, bool combine)
            : base(filename, virtualPath,combine)
        {
            
        }

        public string BuildContent(string content)
        {
            var modelets = new ModualIdSets();
            modelets.Add(new ReferenceModule(VirtualPath.TrimStart('~')));
            return base.BuildContent(content, modelets, new ModuleCollection());
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