using System;
using System.Web.Optimization;
using SeajsBundles.Seajs;

namespace CombineJs.Modules.Modules.CombineModuleFactories
{
    public class BundleFileModuleFactory : IModuleFactory
    {
        public ScriptModule Build(string abstractRequirePath, BundleContext context, bool combine, ScriptModule parent)
        {
            return new BundleFileCombine(abstractRequirePath, context, combine);
        }

        public bool IsModule(string abstractRequirePath, ScriptModule parentModule)
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