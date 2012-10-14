// --------------------------------------------------------------------------------------------------------------------
// <copyright file="InsertExecuteItem.cs" company="">
//   
// </copyright>
// <summary>
//   insert execute item.
// </summary>
// --------------------------------------------------------------------------------------------------------------------


using Ornament.EasySqlExecuter.SqlGenerators.Oracle;
using Ornament.EasySqlExecuter.SqlGenerators.SqlServer;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    /// <summary>
    /// insert execute item.
    /// </summary>
    public class InsertExecuteItem : GenericSaveExecuteItem<InsertExecuteItem>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InsertExecuteItem"/> class.
        /// </summary>
        /// <param name="helper">
        /// The helper.
        /// </param>
        /// <param name="tableName">
        /// The table name.
        /// </param>
        public InsertExecuteItem(DataHelper helper, string tableName) : base(helper, tableName)
        {
        }

        public override CommandType CommandType
        {
            get { return CommandType.Insert; }
        }

        protected internal override void RunSql(SqlExecuter executer)
        {
            switch (DataBaseType)
            {
                case DatabaseType.SqlServer:
                    (new InsertSqlServer(executer)).Execute(this);
                    break;
                default: // DatabaseType.Oracle:
                    (new InsertOracle(executer)).Execute(this);
                    break;
            }
        }
    }
}