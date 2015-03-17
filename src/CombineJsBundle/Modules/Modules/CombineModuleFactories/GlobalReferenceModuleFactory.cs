using System.Web.Optimization;
using SeajsBundles.Seajs;

namespace CombineJs.Modules.Modules.CombineModuleFactories
{
    internal class GlobalReferenceModuleFactory : IModuleFactory
    {
        public ScriptModule Build(string abstractRequirePath, BundleContext context, bool combine, ScriptModule parent)
        {
            return new ReferenceModule(abstractRequirePath);
        }

        public bool IsModule(string abstractRequirePath, ScriptModule parentModule)
        {
            return ModuleFactory.Instance.ReferenceModules.Contains(abstractRequirePath);
        }
    }
}