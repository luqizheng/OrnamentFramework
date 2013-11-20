using System.Collections.ObjectModel;

namespace Ornament.Models
{
    public class Language
    {
        public Language(string name, string key)
        {
            Name = name;
            Key = key;
        }

        public string Name { get; set; }
        public string Key { get; set; }
        public bool IsDefault { get; set; }
    }

    public class LanguageCollection : KeyedCollection<string, Language>
    {
        protected override string GetKeyForItem(Language item)
        {
            return item.Key;
        }
    }
}