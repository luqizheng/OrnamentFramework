using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;

namespace Ornament.Web.Bundles.Seajs
{
    public class ModuleCollection : KeyedCollection<string, ReferenceModule>
    {
        public string[] RequrestIds
        {
            get
            {
                return this.Select(require => require.UniqueId).ToArray();
            }
        }

        protected override string GetKeyForItem(ReferenceModule item)
        {
            return item.UniqueId;
        }

        private Dictionary<string, string> ModualIdPhysicPath = new Dictionary<string, string>();
    }
}
