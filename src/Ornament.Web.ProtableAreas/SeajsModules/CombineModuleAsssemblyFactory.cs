﻿using System.Web.Optimization;
using CombineJs.Modules;
using CombineJs.Modules.Modules;
using SeajsBundles.Seajs;

namespace Ornament.Web.SeajsModules
{
    public class CombineModuleAsssemblyFactory : IModuleFactory
    {
        public ScriptModule Build(string requireId, BundleContext context, bool combine, ScriptModule parent)
        {
            return new CombineModuleAssembly(context, requireId, combine);
        }

        public bool IsModule(string requirId, ScriptModule parent)
        {
            return CombineModuleAssembly.IsAssemblyCombineModules(requirId);
        }
    }
}