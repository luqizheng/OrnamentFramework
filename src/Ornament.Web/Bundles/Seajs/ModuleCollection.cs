using System.Collections.ObjectModel;
using System.Linq;

namespace Ornament.Web.Bundles.Seajs
{
    public class ModuleCollection : KeyedCollection<string, BaseModule>
    {
        public string[] RequrestIds
        {
            get { return (from file in this select file.UniqueId).ToArray(); }
        }

        protected override string GetKeyForItem(BaseModule item)
        {
            return item.UniqueId;
        }

      
    }
}