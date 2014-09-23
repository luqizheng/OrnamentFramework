using System;
using System.Web.Optimization;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace CombineJs.Modules.Modules.CombineModuleFactories
{
    public class BundleFileModuleFactory : IModuleFactory
    {
        public ISeajsModule Build(string abstractRequirePath, BundleContext context, bool combine, ISeajsModule parent)
        {
            return new BundleFileCombine(abstractRequirePath, context, combine);
        }

        public bool IsModule(string abstractRequirePath, ISeajsModule parentModule)
        {
            if (!abstractRequirePath.StartsWith("~"))
            {
                abstractRequirePath = "~" + abstractRequirePath;
            }
            try
            {
                Bundle bundle = BundleTable.Bundles.GetBundleFor(abstractRequirePath);
                if (bundle != null)
                    return true;

                return false;
            }
            catch (ArgumentException)
            {
                return false;
            }
        }
    }
}