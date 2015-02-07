using System.Collections.ObjectModel;
using System.Linq;
using SeajsBundles.Seajs;

namespace CombineJs.Modules
{
    public class ModuleCollection : KeyedCollection<string, IScriptModule>
    {
        internal string[] RequrestIds(ModuleRepository ids)
        {
            return this.Select(ids.GetModualId).ToArray();
        }


        protected override string GetKeyForItem(IScriptModule item)
        {
            return item.OutputId;
        }
    }

    public class AbsloutePathModuleCollection : KeyedCollection<string, IScriptModule>
    {
        protected override string GetKeyForItem(IScriptModule item)
        {
            return item.AbsolutePath;
        }
    }

    public class ModuleReferencePathCollection : KeyedCollection<string, IScriptModule>
    {
        protected override string GetKeyForItem(IScriptModule item)
        {
            return item.RequireId.ToLower();
        }
    }
}