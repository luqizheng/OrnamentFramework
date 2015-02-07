using System.Web.Optimization;
using CombineJs.Modules;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace Ornament.Web.SeajsModules
{
    public class CombineModuleAsssemblyFactory : IModuleFactory
    {
        public IScriptsModule Build(string requireId, BundleContext context, bool combine, IScriptsModule parent)
        {
            return new CombineModuleAssembly(context, requireId, combine);
        }

        public bool IsModule(string requirId, IScriptsModule parent)
        {
            return CombineModuleAssembly.IsAssemblyCombineModules(requirId);
        }
    }
}