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
        /// ִ��ExecuteItem�Ĳ���
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
        /// �趨Sql����Ҫ����ֵ��ÿ�ζ��Ḳ��ǰ����һ�ε�˭���Ǹ�
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
        /// �趨�е�λ�ã���ε��ö��Ḳ��ǰ����趨
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
        /// �趨�е�λ�ã���ε��ö��Ḳ��ǰ����趨
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
        /// ��<seealso cref="columnName"/> ����Ӧ��Column��ֵ������<see cref="beSetValueColumnHandler"/>��ָ����column
        /// </summary>
        /// <param name="columnNameOfValueFrom">���Column��ֵ�Ḷ��beSetValueColumn</param>
        /// <param name="beSetValueColumnHandler">��ȡһ��Column�����Column��ֵ��ȫ����Դ colunmNameָ����column</param>
        /// <returns>
        /// </returns>
        /// <remarks>
        /// �����������ϵ������2�֣�
        /// 1��һ��������Ӧ��������
        /// 2����ͬ������������Ӧ��ͬ�����������
        /// �������������Ҫ����
        /// ֻ�������������Ѿ�ȷ�������Ҳ�Ϊһ�ᷢ���������£�
        /// 1���������δ֪��������1������             
        /// 2���������ȷ��������������������һ�¡�������2������
        /// ����������Ϊ-1������£��Ƴټ�顣
        /// </remarks>
        public SqlExecuteItem ColumnValueFor(string columnNameOfValueFrom, GetColumnHandler beSetValueColumnHandler)
        {
            if (!Table.Columns.Contains(columnNameOfValueFrom))
            {
                throw new Exception(Table.TableName + "�Ҳ���" + columnNameOfValueFrom + "��Column");
            }

            Column beSetValueColumn = beSetValueColumnHandler(new ExecuteBuilder(this, Helper.Driver));
            Column columnWithValue = Table.Columns[columnNameOfValueFrom];
            columnWithValue.ChildColumns.Add(beSetValueColumn);
            return this;
        }


        /// <summary>
        /// �趨����������������Ǹ�ExecuteItem
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