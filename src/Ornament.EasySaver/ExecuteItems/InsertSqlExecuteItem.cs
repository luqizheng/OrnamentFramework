// --------------------------------------------------------------------------------------------------------------------
// <copyright file="InsertExecuteItem.cs" company="">
//   
// </copyright>
// <summary>
//   insert execute item.
// </summary>
// --------------------------------------------------------------------------------------------------------------------


using System.Collections.Generic;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.EasySqlExecuter.Tables;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    /// <summary>
    /// insert execute item.
    /// </summary>
    public class InsertSqlExecuteItem : SqlExecuteItem
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InsertSqlExecuteItem"/> class.
        /// </summary>
        /// <param name="helper">
        /// The helper.
        /// </param>
        /// <param name="tableName">
        /// The table name.
        /// </param>
        public InsertSqlExecuteItem(ExecuteBuilder helper, string tableName)
            : base(helper, tableName)
        {
        }

        public InsertSqlExecuteItem(ExecuteBuilder helper, string tableName, IExecuteItem item)
            : base(helper, tableName, item)
        {
        }

        public override CommandType CommandType
        {
            get { return CommandType.Insert; }
        }

        protected override void ExecuteItems(string sql, List<DbParameter> parameters, Table table)
        {
            if (table.PrimaryKey == null ||
                table.PrimaryKey.ValueSource == PrimaryKeyValueSource.Assigned)
            {
                base.ExecuteItems(sql, parameters, table);
            }
            else
            {
                IList<object> v = Helper.Driver.ExecuteScalar(sql, parameters);
                foreach (object idValue in v)
                {
                    table.PrimaryKey.Values.Add(new Value(idValue));
                }
            }
        }
    }
}