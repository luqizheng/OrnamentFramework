using System;
using System.Collections.Generic;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.EasySqlExecuter.Tables;

namespace Ornament.EasySqlExecuter.SqlGenerators.SqlServer
{
    internal class InsertSqlServer : InsertSql
    {
        protected override string ForIdentitySql(PrimaryKey id, List<DbParameter> dataParameters)
        {
            if (id.ValueSource == PrimaryKeyValueSource.Assigned)
            {
                return null;
            }
            return String.Format("SELECT IDENT_CURRENT ('{0}')", id.Table.TableName);
        }
    }
}