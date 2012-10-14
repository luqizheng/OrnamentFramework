using System.Collections.ObjectModel;

namespace Ornament.EasySqlExecuter.Tables
{
    public class ForeignKeyList : KeyedCollection<string, ForeignKey>
    {
        protected override string GetKeyForItem(ForeignKey item)
        {
            return item.Name;
        }
    }
}