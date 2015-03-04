using System.Web.Optimization;

namespace CombineJs.Modules.Modules
{
    public interface IModuleFactory
    {
        ScriptModule Build(string abstractRequirePath, BundleContext context, bool combine, ScriptModule parent);

        bool IsModule(string abstractRequirePath, ScriptModule parentModule);
    }
}