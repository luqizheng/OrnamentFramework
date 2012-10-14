using System;
using System.Collections.Generic;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.EasySqlExecuter.SqlGenerators;
using Ornament.EasySqlExecuter.Tables;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    /// <summary>
    /// create execute item.
    /// </summary>
    /// <param name="helper">
    /// The helper.
    /// </param>
    public delegate Column GetColumnHandler(ExecuteBuilder helper);

    public delegate Column[] GetMultiColumnHandler(ExecuteBuilder helpler);

    public delegate object[] CreateValue();

    /// <summary>
    /// execute item.
    /// </summary>
    public abstract class SqlExecuteItem : ExecuteItem
    {
        private readonly Table _table;


        /// <summary>
        /// Initializes a new instance of the <see cref="SqlExecuteItem"/> class. 
        /// execute item.
        /// </summary>
        /// <param name="helper">
        /// </param>
        /// <param name="tableName">
        /// </param>
        internal SqlExecuteItem(ExecuteBuilder helper, string tableName)
            : base(helper)
        {
            _table = new Table { TableName = tableName };
        }

        internal SqlExecuteItem(ExecuteBuilder helper, string tableName, IExecuteItem executeItem)
            : base(helper, executeItem)
        {
            _table = new Table { TableName = tableName };
        }


        /// <summary>
        /// Gets CommandType.
        /// </summary>
        public abstract CommandType CommandType { get; }

        /// <summary>
        /// Gets DataBaseType.
        /// </summary>
        public DatabaseType DataBaseType
        {
            get { return Helper.Driver.DatabaseType; }
        }


        public Table Table
        {
            get { return _table; }
        }

        /// <summary>
        /// 执行ExecuteItem的操作
        /// </summary>
        /// <returns>
        /// </returns>
        public override IExecuteItem Execute()
        {
            SqlGenerator sqlGenerator = SqlGenerator.GetSqlGenerator(CommandType, Helper.Driver.DatabaseType);
            List<DbParameter> parameters;
            string sql = sqlGenerator.Generate(this, out parameters);
            ExecuteItems(sql, parameters, Table);
            foreach (Column column in Table.Columns)
            {
                column.Notify();
            }
            return this;
        }

        protected virtual void ExecuteItems(string sql, List<DbParameter> parameters, Table table)
        {
            Helper.Driver.ExecuteNonQuery(sql, parameters);
        }

        /// <summary>
        /// 设定Sql的需要的数值。每次都会覆盖前面上一次的谁的那个
        /// </summary>
        /// <param name="values">
        /// </param>
        /// <returns>
        /// </returns>
        public virtual SqlExecuteItem Values(params Value[][] values)
        {
            if (values.Length == 0)
                throw new ArgumentOutOfRangeException("values", "length should not be zero.");
            int inputColumnCount = Table.Columns.CountInputValueColumn;

            if (Table.PrimaryKey != null &&
                Table.PrimaryKey.ValueSource == PrimaryKeyValueSource.Identity && inputColumnCount == 0)
            {
                throw new ArgumentException(
                    "Primary Key is build by database, please explicit declaration column to set value.");
            }

            if (inputColumnCount == 0)
            {
                for (int i = 0; i < values[0].Length; i++)
                {
                    Table.Columns.Add(new Column());
                }
            }

            foreach (var rowValue in values)
            {
                Table.AddValues(rowValue);
            }

            return this;
        }

        /// <summary>
        /// 设定列的位置，多次调用都会覆盖前面的设定
        /// </summary>
        /// <param name="fieldNames">
        /// </param>
        /// <returns>
        /// </returns>
        public virtual SqlExecuteItem Columns(params string[] fieldNames)
        {
            foreach (string filedName in fieldNames)
            {
                _table.Columns.Add(filedName);
            }
            return this;
        }

        /// <summary>
        /// 设定列的位置，多次调用都会覆盖前面的设定
        /// </summary>
        /// <param name="fieldName">
        /// </param>
        /// <param name="splitSymbol">
        /// </param>
        /// <returns>
        /// </returns>
        public virtual SqlExecuteItem Columns(string fieldName, char splitSymbol)
        {
            string[] a = fieldName.Replace("\r\n", string.Empty).Split(splitSymbol);
            Columns(a);
            return this;
        }

        /// <summary>
        /// End current execution item setting.
        /// </summary>
        /// <returns></returns>
        public new SqlExecuteItem End()
        {
            return (SqlExecuteItem)base.End();
        }

        /// <summary>
        /// 用<seealso cref="columnName"/> 所对应的Column的值，付给<see cref="beSetValueColumnHandler"/>所指定的column
        /// </summary>
        /// <param name="columnNameOfValueFrom">这个Column的值会付给beSetValueColumn</param>
        /// <param name="beSetValueColumnHandler">获取一个Column，这个Column的值，全部来源 colunmName指定的column</param>
        /// <returns>
        /// </returns>
        /// <remarks>
        /// 主键和外键关系有以下2种：
        /// 1）一个主键对应多个外键。
        /// 2）相同数量的主键对应相同数量的外键。
        /// 因此其余的情况需要报错。
        /// 只有在主键数量已经确定，并且不为一会发生错误，如下：
        /// 1）外键数量未知。不符合1，报错             
        /// 2）外键数量确定，但是与主键数量不一致。不符合2，报错。
        /// 当主键数量为-1的情况下，推迟检查。
        /// </remarks>
        public SqlExecuteItem ColumnValueFor(string columnNameOfValueFrom, GetColumnHandler beSetValueColumnHandler)
        {
            if (!Table.Columns.Contains(columnNameOfValueFrom))
            {
                throw new Exception(Table.TableName + "找不到" + columnNameOfValueFrom + "的Column");
            }

            Column beSetValueColumn = beSetValueColumnHandler(new ExecuteBuilder(this, Helper.Driver));
            Column columnWithValue = Table.Columns[columnNameOfValueFrom];
            columnWithValue.ChildColumns.Add(beSetValueColumn);
            return this;
        }


        /// <summary>
        /// 设定外键的数据来自于那个ExecuteItem
        /// </summary>
        /// <param name="columnName"></param>
        /// <param name="getColumnWithValue">
        /// </param>
        /// <returns>
        /// </returns>
        public virtual SqlExecuteItem ColumnValueFrom(string columnName, GetColumnHandler getColumnWithValue)
        {
            if (!Table.Columns.Contains(columnName))
            {
                Table.Columns.Add(columnName);
            }
            CreateColumnFrom(Table.Columns[columnName], getColumnWithValue);
            return this;
        }

        public virtual SqlExecuteItem ColumnValueFrom(int index, GetColumnHandler getColumnWithValue)
        {
            if (index >= Table.Columns.Count)
                throw new ArgumentOutOfRangeException("index", "index is out of Table's columns.");
            CreateColumnFrom(Table.Columns[index], getColumnWithValue);
            return this;
        }

        private void CreateColumnFrom(Column beSetValueColumn, GetColumnHandler getColumnWithValue)
        {
            Column columnWithValue = getColumnWithValue(new ExecuteBuilder(this, Helper.Driver, true));
            columnWithValue.ChildColumns.Add(beSetValueColumn);
        }
    }
}