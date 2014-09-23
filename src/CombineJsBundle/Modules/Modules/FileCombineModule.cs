using System.IO;
using System.Web.Optimization;

namespace CombineJs.Modules.Modules
{
    /// <summary>
    ///     合并模块,从 物理路径上面获取到文件
    /// </summary>
    public class FileCombineModule : CombineModule
    {
        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="referId"></param>
        /// <param name="combine"></param>
        /// <param name="physciPath"></param>
        public FileCombineModule(BundleContext context, string referId, bool combine, string physciPath)
            : base(referId, context, combine)
        {
            PhysciPath = physciPath;
        }


        /// <summary>
        /// </summary>
        public string PhysciPath { get; set; }

        /// <summary>
        /// </summary>
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