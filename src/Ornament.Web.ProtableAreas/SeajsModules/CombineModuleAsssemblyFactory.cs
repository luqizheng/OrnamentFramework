namespace Ornament.Web.SeajsModules
{
    using SeajsBundles.Seajs;
    using SeajsBundles.Seajs.Modules;
    using System;
    using System.Web.Optimization;

    public class CombineModuleAsssemblyFactory : IModuleFactory
    {
        public ISeajsModule Build(string requireId, BundleContext context, bool combine, ISeajsModule parent)
        {
            return new CombineModuleAssembly(context, requireId, combine);
        }

        public bool IsModule(string requirId, ISeajsModule parent)
        {
            return CombineModuleAssembly.IsAssemblyCombineModules(requirId);
        }
    }
}

