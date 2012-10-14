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
                                                      String.Format("�������Value���ϵĳ���(length={0})���ʼ���ĳ���(length ={1})��ͬ",
                                                                    item.Count, _defaultDataValueSetLength));
            item.Row = index;
            base.InsertItem(index, item);
        }
    }
}