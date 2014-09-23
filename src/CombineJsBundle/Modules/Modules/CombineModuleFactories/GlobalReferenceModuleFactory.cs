using System.Web.Optimization;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace CombineJs.Modules.Modules.CombineModuleFactories
{
    internal class GlobalReferenceModuleFactory : IModuleFactory
    {
        public ISeajsModule Build(string abstractRequirePath, BundleContext context, bool combine, ISeajsModule parent)
        {
            return new ReferenceModule(abstractRequirePath);
        }

        public bool IsModule(string abstractRequirePath, ISeajsModule parentModule)
        {
            return ModuleFactory.Instance.ReferenceModules.Contains(abstractRequirePath);
        }
    }
}