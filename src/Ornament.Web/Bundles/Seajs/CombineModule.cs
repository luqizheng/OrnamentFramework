using System.IO;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    /// </summary>
    public class CombineModule : BaseCombineModule
    {
        /// <summary>
        /// </summary>
        /// <param name="physicPath"></param>
        public CombineModule(string physicPath, string virtualPath, bool combine)
            : base(physicPath, virtualPath, combine)
        {
            UniqueId = physicPath;
        }
        /// <summary>
        /// 
        /// </summary>
        public string PhysciPath
        {
            get { return UniqueId; }
        }

        /// <summary>
        /// </summary>
        /// <param name="combinedModules">已经合并过</param>
        /// <param name="referencModule">reference 过的 module </param>
        /// <returns></returns>
        public virtual string BuildContent(ModualIdSets combinedModules, ModuleCollection referencModule)
        {
            string content = null;
            using (var reader = new StreamReader(PhysciPath))
            {
                content = reader.ReadToEnd();
            }
            return BuildContent(content, combinedModules, referencModule);
        }
    }
}