// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DeleteExecuteItem.cs" company="">
//   
// </copyright>
// <summary>
//   delete execute item.
// </summary>
// --------------------------------------------------------------------------------------------------------------------


using Ornament.EasySqlExecuter.SqlGenerators;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    /// <summary>
    /// delete execute item.
    /// </summary>
    public class DeleteExecuteItem : GenericExecuteItem<DeleteExecuteItem>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DeleteExecuteItem"/> class.
        /// </summary>
        /// <param name="helper">
        /// The helper.
        /// </param>
        /// <param name="tableName">
        /// The table name.
        /// </param>
        public DeleteExecuteItem(DataHelper helper, string tableName)
            : base(helper, tableName)
        {
        }

        /// <summary>
        /// Gets CommandType.
        /// </summary>
        public override CommandType CommandType
        {
            get { return CommandType.Delete; }
        }

        protected internal override void RunSql(SqlExecuter executer)
        {
            var deleteSql = new DeleteSql(executer);
            deleteSql.Execute(this);
        }
    }
}