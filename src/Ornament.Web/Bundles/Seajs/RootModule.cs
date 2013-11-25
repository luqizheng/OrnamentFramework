using System;
using System.Web.Optimization;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    ///     Moudle
    /// </summary>
    public class RootModule : CombineModual
    {
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
            var collection = new ModuleCollection();
            collection.Add(this);
            var modelets = new ModualIdSets();
            modelets.Add(this);
            return base.BuildContent(content, modelets, collection);
        }
    }
}