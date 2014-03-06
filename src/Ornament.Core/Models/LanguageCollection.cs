using System.Collections.ObjectModel;
using System.Linq;
using NHibernate.Hql;

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
            foreach (var settingLang in this)
            {
                if (settingLang.Key == language)
                {
                    return settingLang;
                }

                if (settingLang.MatchKey.Contains(language))
                    return settingLang;
            }
            return null;
        }
        
        public Language DefaultOrMatch(string[] language)
        {
            foreach (var lang in language)
            {
                foreach (var settingLang in this)
                {
                    if (settingLang.Key == lang)
                    {
                        return settingLang;
                    }

                    if (settingLang.MatchKey.Contains(lang))
                        return settingLang;
                }
            }

            foreach (var settingLang in this)
            {
                if (settingLang.IsDefault)
                    return settingLang;
            }
            return this.First();
        }
    }
}