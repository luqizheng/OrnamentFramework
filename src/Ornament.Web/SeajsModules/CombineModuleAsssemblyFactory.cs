using System.Web.Optimization;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace Ornament.Web.SeajsModules
{
    public class CombineModuleAsssemblyFactory : IModuleFactory
    {
        public ISeajsModule Build(string requireId, BundleContext context, bool combine,ISeajsModule parent)
        {
            return new CombineModuleAssembly(context, requireId, combine);
        }

        public bool IsModule(string requirId, ISeajsModule parent)
        {
            return CombineModuleAssembly.IsAssemblyCombineModules(requirId);
        }
    }
}