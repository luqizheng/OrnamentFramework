using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.Models
{
    public class Language
    {
        public Language(string name,string key)
        {
            this.Name = name;
            this.Key = key;
        }
        public string Name { get; set; }
        public string Key { get; set; }
        public bool IsDefault { get; set; }
    }

    public class LanguageCollection:System.Collections.ObjectModel.KeyedCollection<string,Language>
    {
        protected override string GetKeyForItem(Language item)
        {
            return item.Key;
        }
    }
}
