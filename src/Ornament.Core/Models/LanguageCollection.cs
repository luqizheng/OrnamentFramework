using System.Collections.ObjectModel;
using System.Linq;

namespace Ornament.Models
{
    public class LanguageCollection : KeyedCollection<string, Language>
    {
        protected override string GetKeyForItem(Language item)
        {
            return item.Key;
        }

        public Language Find(string language)
        {
            if (Contains(language))
            {
                return this[language];
            }
            return null;
        }

        public Language DefaultOrMatch(string[] language)
        {
            return language.Select(lang => this.Find(lang)).FirstOrDefault(match => match != null);
        }
    }
}