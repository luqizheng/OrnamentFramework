using System.Collections.ObjectModel;

namespace Ornament.Models
{
    public class LanguageCollection : KeyedCollection<string, Language>
    {
        protected override string GetKeyForItem(Language item)
        {
            return item.Key;
        }
    }
}