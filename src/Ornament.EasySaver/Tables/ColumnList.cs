using System.Collections.ObjectModel;
using System.Linq;

namespace Ornament.EasySqlExecuter.Tables
{
    public class ColumnList : KeyedCollection<string, Column>
    {
        /// <summary>
        /// 统计出可以设置Value的Column
        /// </summary>
        public int CountInputValueColumn
        {
            get
            {
                return
                    this.Select(col => col as PrimaryKey).Count(
                        pk => pk == null || pk.ValueSource != PrimaryKeyValueSource.Identity);
            }
        }

        protected override string GetKeyForItem(Column item)
        {
            return item.Name;
        }

        protected override void InsertItem(int index, Column item)
        {
            //PrimaryKey 永远要排在 Column之后.
            if (item is PrimaryKey)
            {
                base.InsertItem(0, item);
                return;
            }
            base.InsertItem(index, item);
        }

        public void ClearNormalColumn()
        {
            for (int i = Count - 1; i >= 0; i--)
            {
                if (this[i].GetType() == typeof (Column))
                {
                    RemoveAt(i);
                }
                else
                {
                    //beacase the first party should be column, and following is ForeignKe;
                    break;
                }
            }
        }
    }
}