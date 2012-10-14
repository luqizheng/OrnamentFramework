using System;
using System.Collections.ObjectModel;

namespace Ornament.EasySqlExecuter
{
    public class DataValueSetCollection : Collection<RowDataValue>
    {
        private int _defaultDataValueSetLength;

        protected override void InsertItem(int index, RowDataValue item)
        {
            if (index == 0)
            {
                _defaultDataValueSetLength = item.Count;
            }
            if (_defaultDataValueSetLength != item.Count)
                throw new ArgumentOutOfRangeException("item",
                                                      String.Format("新输入的Value集合的长度(length={0})与初始化的长度(length ={1})不同",
                                                                    item.Count, _defaultDataValueSetLength));
            item.Row = index;
            base.InsertItem(index, item);
        }
    }
}