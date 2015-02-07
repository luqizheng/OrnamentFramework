using System;
using System.Web.Optimization;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace CombineJs.Modules.Modules.CombineModuleFactories
{
    public class BundleFileModuleFactory : IModuleFactory
    {
        public IScriptModule Build(string abstractRequirePath, BundleContext context, bool combine, IScriptModule parent)
        {
            return new BundleFileCombine(abstractRequirePath, context, combine);
        }

        public bool IsModule(string abstractRequirePath, IScriptModule parentModule)
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