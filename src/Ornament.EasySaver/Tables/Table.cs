using System;

namespace Ornament.EasySqlExecuter.Tables
{
    /// <summary>
    /// 
    /// </summary>
    public class Table
    {
        private ColumnList _columns;

        private PrimaryKey _primaryKey;

        public ColumnList Columns
        {
            get { return _columns ?? (_columns = new ColumnList()); }
        }

        public PrimaryKey PrimaryKey
        {
            get { return _primaryKey; }
            set
            {
                if (value == null) return;
                _primaryKey = value;
                _primaryKey.Table = this;
                Columns.Add(_primaryKey);
            }
        }

        public int RowCount
        {
            get
            {
                if (_columns == null || Columns.Count == 0)
                    return 0;
                return _columns[0].Values.Count;
            }
        }

        public string TableName { get; set; }

        public TableRow this[int rowIndex]
        {
            get { return new TableRow(this, rowIndex); }
        }

        public Value this[int row, int col]
        {
            get { return Columns[col].Values[row]; }
        }

        public void AddValues(Value[] values)
        {
            if (this.Columns.Count != 0 && values.Length > this.Columns.Count)
            {
                throw new ArgumentOutOfRangeException("values", "Input values's length is more than columns.");
            }
            for (int i = 0; i < values.Length; i++)
            {
                Columns[i].Values.Add(values[i]);
            }
        }

        #region Nested type: TableRow

        public class TableRow
        {
            private readonly int _rowIndex;
            private readonly Table _table;

            internal TableRow(Table table, int rowIndex)
            {
                _table = table;
                _rowIndex = rowIndex;
            }

            public Value this[int columnIndex]
            {
                get { return _table.Columns[columnIndex].Values[_rowIndex]; }
            }
        }

        #endregion
    }
}