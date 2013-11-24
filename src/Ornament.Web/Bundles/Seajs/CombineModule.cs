using System.IO;
using System.Web.Optimization;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    ///     合并模块,从 物理路径上面获取到文件
    /// </summary>
    public class CombineModule : BaseCombineModule
    {
        /// <summary>
        /// </summary>
        /// <param name="uniqureId"></param>
        /// <param name="virtualPath"></param>
        /// <param name="combine"></param>
        public CombineModule(BundleContext context, string uniqureId, string virtualPath, bool combine)
            : base(context, uniqureId, virtualPath, combine)
        {
            UniqueId = uniqureId;
        }


        /// <summary>
        /// </summary>
        public string PhysciPath
        {
            get { return UniqueId; }
        }

        /// <summary>
        /// </summary>
        /// <param name="combinedModules">已经合并过Modules,避免重复合并</param>
        /// <param name="referencModule">已经知道是Reference module </param>
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