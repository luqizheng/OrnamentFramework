using System.Collections.ObjectModel;
using System.Linq;

namespace CombineJs.Modules
{
    public class ModuleCollection : KeyedCollection<string, ScriptModule>
    {
        internal string[] RequrestIds(ModuleRepository ids)
        {
            return this.Select(ids.GetModualId).ToArray();
        }


        protected override string GetKeyForItem(ScriptModule item)
        {
            return item.OutputId;
        }
    }

    public class AbsloutePathModuleCollection : KeyedCollection<string, ScriptModule>
    {
        protected override string GetKeyForItem(ScriptModule item)
        {
            return item.AbsolutePath;
        }
    }

    public class ModuleReferencePathCollection : KeyedCollection<string, ScriptModule>
    {
        protected override string GetKeyForItem(ScriptModule item)
        {
            return item.RequireId.ToLower();
        }
    }
}