using System.Web.Optimization;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace CombineJs.Modules.Modules.CombineModuleFactories
{
    internal class DefaultModuleFactory : IModuleFactory
    {
        public IScriptModule Build(string abstractRequirePath, BundleContext context, bool combine, IScriptModule parent)
        {
            return new ReferenceModule(abstractRequirePath);
        }

        public bool IsModule(string abstractRequirePath, IScriptModule parentModule)
        {
            return true;
        }
    }
}