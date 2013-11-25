using System;
using System.Web.Optimization;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    ///     Module
    /// </summary>
    public class RootModule : CombineModule
    {
        /// <summary>
        ///必须为 reference module 的 module,保存在这里的module会自动跳过过
        /// </summary>
        public static ModuleCollection ReferenceModules = new ModuleCollection();

        public RootModule(string uniqureId, BundleContext context, bool isCombine)
            : base(uniqureId, context, isCombine)
        {

        }

        public override string Content
        {
            get { throw new NotImplementedException(); }
        }

        public string BuildContent(string content)
        {
            var modelets = new ModualIdSets();
            modelets.Add(this);
            return base.BuildContent(content, modelets, ReferenceModules);
        }
    }
}