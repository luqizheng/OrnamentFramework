using System.Web.Optimization;

namespace CombineJs.Modules
{
    public interface IScriptReader
    {
        bool Content(BundleContext context,ScriptModule module, out string content);
    }
}