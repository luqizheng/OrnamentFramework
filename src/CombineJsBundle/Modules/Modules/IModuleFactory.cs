using System.Web.Optimization;

namespace SeajsBundles.Seajs.Modules
{
    public interface IModuleFactory
    {
        ISeajsModule Build(string abstractRequirePath, BundleContext context, bool combine, ISeajsModule parent);

        bool IsModule(string abstractRequirePath,ISeajsModule parentModule);
    }
}