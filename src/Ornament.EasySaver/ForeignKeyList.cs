using System.Collections.ObjectModel;

namespace Ornament.EasySqlExecuter
{
    public class ForeignKeyList : KeyedCollection<string, ForeignKey>
    {
        protected override string GetKeyForItem(ForeignKey item)
        {
            return item.FieldName;
        }
    }
}