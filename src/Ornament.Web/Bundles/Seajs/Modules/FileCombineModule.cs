using System.IO;
using System.Web.Optimization;

namespace Ornament.Web.Bundles.Seajs.Modules
{
    /// <summary>
    ///     合并模块,从 物理路径上面获取到文件
    /// </summary>
    public class FileCombineModule : CombineModule
    {
        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="uniqureId"></param>
        /// <param name="combine"></param>
        /// <param name="physciPath"></param>
        public FileCombineModule(BundleContext context, string uniqureId, bool combine, string physciPath)
            : base(uniqureId, context, combine)
        {
            PhysciPath = physciPath;
        }


        /// <summary>
        /// </summary>
        public string PhysciPath { get; set; }

        public override string Content
        {
            get
            {
                using (var reader = new StreamReader(PhysciPath))
                {
                    return reader.ReadToEnd();
                }
            }
        }
    }
}