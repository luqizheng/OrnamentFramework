// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DeleteSql.cs" company="">
//   
// </copyright>
// <summary>
//   delete sql.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using System.Data;
using System.Text;
using Ornament.EasySqlExecuter.ExecuteItems;

namespace Ornament.EasySqlExecuter.SqlGenerators
{
    #region

    

    #endregion

    /// <summary>
    /// delete sql.
    /// </summary>
    public class DeleteSql : CommandGenerator<DeleteExecuteItem>
    {
        public DeleteSql(SqlExecuter execute) : base(execute)
        {
        }

        /// <summary>
        /// generate.
        /// </summary>
        /// <param name="executeItem">
        /// The execute item.
        /// </param>
        /// <param name="dataParameters">
        /// The data parameters.
        /// </param>
        /// <returns>
        /// </returns>
        protected override StringBuilder Generate(DeleteExecuteItem executeItem, out List<IDataParameter> dataParameters)
        {
            dataParameters = new List<IDataParameter>();
            return new StringBuilder("delete from " + executeItem.TableName);
        }

        /// <summary>
        /// check.
        /// </summary>
        /// <param name="sqlExecuteItem">
        /// The execute item.
        /// </param>
        public override void Check(SqlExecuteItem sqlExecuteItem)
        {
        }

        protected override void Execute(SqlExecuter execute, DeleteExecuteItem executeItem, string sql,
                                        List<IDataParameter> dataParameters)
        {
            if (executeItem.ValueSetList.Count != 0)
            {
                execute.ExecuteNonQuery(sql, dataParameters, executeItem.ValueSetList);
            }
            else
            {
                execute.ExecuteNonQuery(sql);
            }
        }
    }
}