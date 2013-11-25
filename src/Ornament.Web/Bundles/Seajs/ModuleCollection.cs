﻿using System.Collections.ObjectModel;
using System.Linq;

namespace Ornament.Web.Bundles.Seajs
{
    public class ModuleCollection : KeyedCollection<string, ISeajsModule>
    {
        internal string[] RequrestIds(ModualIdSets ids)
        {
            return this.Select(ids.GetModualId).ToArray();
        }

        

        protected override string GetKeyForItem(ISeajsModule item)
        {
            return item.UniqueId;
        }
    }
}