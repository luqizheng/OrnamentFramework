using System.Collections.ObjectModel;
using System.Linq;
using SeajsBundles.Seajs;

namespace CombineJs.Modules
{
    public class ModuleCollection : KeyedCollection<string, ISeajsModule>
    {
        internal string[] RequrestIds(ModuleRepository ids)
        {
            return this.Select(ids.GetModualId).ToArray();
        }


        protected override string GetKeyForItem(ISeajsModule item)
        {
            return item.OutputId;
        }
    }

    public class AbsloutePathModuleCollection : KeyedCollection<string, ISeajsModule>
    {
        protected override string GetKeyForItem(ISeajsModule item)
        {
            return item.AbsolutePath;
        }
    }

    public class ModuleReferencePathCollection : KeyedCollection<string, ISeajsModule>
    {
        protected override string GetKeyForItem(ISeajsModule item)
        {
            return item.RequireId.ToLower();
        }
    }
}