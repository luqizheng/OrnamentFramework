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
        
    }
}