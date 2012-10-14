// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ExecuteItem.cs" company="">
//   
// </copyright>
// <summary>
//   create execute item.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace Ornament.EasySqlExecuter
{

    #region

    #endregion

    /// <summary>
    /// execute item.
    /// </summary>
    public abstract class ExecuteItem
    {
        /// <summary>
        /// helper.
        /// </summary>
        protected readonly DataHelper helper;

        /// <summary>
        /// foreign keys.
        /// </summary>
        private ForeignKeyList _foreignKeys;

        /// <summary>
        /// plan affect row.
        /// </summary>
        protected int _planAffectRow = -1;

        /// <summary>
        /// primary key.
        /// </summary>
        private PrimaryKey _primaryKey;

        /// <summary>
        /// Initializes a new instance of the <see cref="ExecuteItem"/> class. 
        /// execute item.
        /// </summary>
        /// <param name="helper">
        /// </param>
        /// <param name="tableName">
        /// </param>
        internal ExecuteItem(DataHelper helper, string tableName)
        {
            this.helper = helper;
            SqlExecuter = helper.sqlExecuter;
            ColumnsList = new List<string>();
            ValueSetList = new DataValueSetCollection();
            TableName = tableName;
        }

        /// <summary>
        /// value set list.
        /// </summary>
        internal DataValueSetCollection ValueSetList { get; private set; }

        /// <summary>
        /// Gets CommandType.
        /// </summary>
        public abstract CommandType CommandType { get; }

        /// <summary>
        /// Gets DataBaseType.
        /// </summary>
        public DatabaseType DataBaseType
        {
            get { return helper.sqlExecuter.Driver.DataBaseType; }
        }

        /// <summary>
        /// foreign keys.
        /// </summary>
        public ForeignKeyList ForeignKeys
        {
            get
            {
                if (_foreignKeys == null)
                {
                    _foreignKeys = new ForeignKeyList();
                }

                return _foreignKeys;
            }
        }

        /// <summary>
        /// columns list.
        /// </summary>
        internal List<string> ColumnsList { get; private set; }


        /// <summary>
        /// 获取本ExecuteItem，预计执行后,影响了多少行数据
        /// </summary>
        public int PlanAffectRow
        {
            get
            {
                if (_planAffectRow == -1 && CommandType == CommandType.Insert)
                {
                    _planAffectRow = ValueSetList.Count == 0 ? -1 : ValueSetList.Count;
                }

                return _planAffectRow;
            }

            protected set { _planAffectRow = value; }
        }

        /// <summary>
        /// Gets or sets ExecuteOrder.
        /// </summary>
        internal int ExecuteOrder { get; set; }

        /// <summary>
        /// Gets or sets PrimaryKey.
        /// </summary>
        public PrimaryKey PrimaryKey
        {
            get { return _primaryKey; }

            set
            {
                if (value != null)
                {
                    _primaryKey = value;
                    _primaryKey.TableName = TableName;
                    _primaryKey.ExecuteItem = this;
                }
            }
        }


        /// <summary>
        /// Gets TableName.
        /// </summary>
        public string TableName { get; private set; }

        /// <summary>
        /// Gets SqlExecuter.
        /// </summary>
        internal SqlExecuter SqlExecuter { get; private set; }

        /// <summary>
        /// 设定Sql的需要的数值。每次都会覆盖前面上一次的谁的那个
        /// </summary>
        /// <param name="values">
        /// </param>
        /// <returns>
        /// </returns>
        public virtual ExecuteItem Values(params object[][] values)
        {
            ValueSetList.Clear();
            foreach (var rowValue in values)
            {
                var dataValueSet = new RowDataValue();
                foreach (object cellValue in rowValue)
                {
                    dataValueSet.Add(new DataValue(cellValue));
                }

                ValueSetList.Add(dataValueSet);
            }

            return this;
        }

        /// <summary>
        /// 设定列的位置，多次调用都会覆盖前面的设定
        /// </summary>
        /// <param name="fieldName">
        /// </param>
        /// <returns>
        /// </returns>
        public virtual ExecuteItem Columns(params string[] fieldName)
        {
            ColumnsList.Clear();
            ColumnsList.AddRange(fieldName);
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
        public virtual ExecuteItem Columns(string fieldName, char splitSymbol)
        {
            ColumnsList.Clear();
            string[] a = fieldName.Replace("\r\n", string.Empty).Split(splitSymbol);
            Columns(a);
            return this;
        }

        /// <summary>
        /// forgine key.
        /// </summary>
        /// <param name="key">
        /// </param>
        /// <returns>
        /// </returns>
        public ExecuteItem ForgineKey(params ForeignKey[] key)
        {
            if (key == null)
            {
                throw new ArgumentNullException("key");
            }

            foreach (ForeignKey fk in key)
            {
                ForeignKeys.Add(fk);
                fk.ExecuteItem = this;
            }

            return this;
        }

        /// <summary>
        /// 立刻执行所有操作
        /// </summary>
        /// <returns>
        /// </returns>
        public DataHelper Execute()
        {
            return helper.Execute();
        }


        protected internal abstract void RunSql(SqlExecuter executer);


        /// <summary>
        /// new command.
        /// </summary>
        /// <returns>
        /// </returns>
        public DataHelper NewCommand()
        {
            return helper;
        }
    }
}