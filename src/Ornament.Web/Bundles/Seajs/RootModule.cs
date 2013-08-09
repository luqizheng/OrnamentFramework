using System.Web;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    ///     Moudle
    /// </summary>
    public class RootModule : BaseCombineModule
    {


        public RootModule(string filename, string virtualPath)
            : base(filename, virtualPath)
        {

        }

        public string BuildContent(string content)
        {
            var modelets = new ModualIdSets();
            modelets.Add(new ReferenceModule(this.VirtualPath.TrimStart('~')));
            return base.BuildContent(content, modelets, new ModuleCollection());
        }

        protected override string GetOutputModuleId(ModualIdSets moduleIdList)
        {
            return VirtualPathUtility.ToAbsolute(this.VirtualPath);

        }
    }


}