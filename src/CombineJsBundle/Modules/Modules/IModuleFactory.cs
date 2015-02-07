using System.Web.Optimization;
using CombineJs.Modules;

namespace SeajsBundles.Seajs.Modules
{
    public interface IModuleFactory
    {
        IScriptsModule Build(string abstractRequirePath, BundleContext context, bool combine, IScriptsModule parent);

        bool IsModule(string abstractRequirePath,IScriptsModule parentModule);
    }
}