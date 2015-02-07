using System.Web.Optimization;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace CombineJs.Modules.Modules.CombineModuleFactories
{
    internal class GlobalReferenceModuleFactory : IModuleFactory
    {
        public IScriptsModule Build(string abstractRequirePath, BundleContext context, bool combine, IScriptsModule parent)
        {
            return new ReferenceModule(abstractRequirePath);
        }

        public bool IsModule(string abstractRequirePath, IScriptsModule parentModule)
        {
            return ModuleFactory.Instance.ReferenceModules.Contains(abstractRequirePath);
        }
    }
}