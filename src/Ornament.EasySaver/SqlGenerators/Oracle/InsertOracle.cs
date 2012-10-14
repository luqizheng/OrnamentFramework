// --------------------------------------------------------------------------------------------------------------------
// <copyright file="InsertOracle.cs" company="">
//   
// </copyright>
// <summary>
//   insert oracle.
// </summary>
// --------------------------------------------------------------------------------------------------------------------


using System;
using System.Collections.Generic;
using System.Data;
using Ornament.EasySqlExecuter.Tables;

namespace Ornament.EasySqlExecuter.SqlGenerators.Oracle
{
    /// <summary>
    /// insert oracle.
    /// </summary>
    internal class InsertOracle : InsertSql
    {
        public InsertOracle(SqlExecuter execute) : base(execute)
        {
        }

        /// <summary>
        /// for identity sql.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <param name="dataParameters">
        /// The data parameters.
        /// </param>
        /// <returns>
        /// The for identity sql.
        /// </returns>
        protected override string ForIdentitySql(PrimaryKey id, List<IDataParameter> dataParameters)
        {
            if (!String.IsNullOrEmpty(id.FieldName))
            {
                return String.Format("select {0} from {1}", id.FieldName, id.TableName);
            }

            if (id.IdType == typeof (Guid))
            {
                return String.Format("select '{0}'", Guid.NewGuid());
            }

            return String.Format("select {0}.CURRVAL", id.SequenceName);
        }
    }
}