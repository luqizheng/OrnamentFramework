using System;
using System.Text;
using System.Web.Optimization;
using SeajsBundles.Seajs;

namespace CombineJs.Modules
{
    /// <summary>
    ///     Module
    /// </summary>
    public class RootModule : CombineModule
    {
        public RootModule(string uniqureId, BundleContext context, bool isCombine)
            : base(uniqureId, context, isCombine)
        {
            this.AbsolutePath = uniqureId;
        }

        public override string Content
        {
            get { throw new NotImplementedException(); }
        }

        protected override StringBuilder RebuildDefinedHeader(string content, ModuleRepository moduleIdList)
        {
            return new StringBuilder(content);
        }

        public string BuildContent(string content)
        {
            var modelets = new ModuleRepository();
            //modelets.Add(this);
            return base.BuildContent(content, modelets);
        }
    }
}