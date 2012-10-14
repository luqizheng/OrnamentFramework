using System.Collections.Generic;

namespace Ornament.EasySqlExecuter.Tables
{
    public class Column
    {
        private IList<Column> _childColumns;
        private List<Value> _value;
        public string Name { get; set; }

        public List<Value> Values
        {
            get { return _value ?? (_value = new List<Value>()); }
        }

        public IList<Column> ChildColumns
        {
            get { return _childColumns ?? (_childColumns = new List<Column>()); }
        }

        public static implicit operator Column(string columnName)
        {
            return new Column { Name = columnName };
        }

        public void Notify()
        {
            if (_childColumns == null)
                return;
            foreach (Column childColumn in ChildColumns)
            {
                if (childColumn.Values.Count == 0)
                {
                    foreach (Value val in Values)
                    {
                        childColumn.Values.Add(val);
                    }
                }
                else
                {
                    for (int i = 0; i < childColumn.Values.Count; i++)
                    {
                        childColumn.Values[i] = this.Values[i];
                    }
                }
            }
        }
    }
}