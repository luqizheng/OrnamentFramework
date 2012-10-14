using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.EasySqlExecuter.ExecuteItems;
using Ornament.EasySqlExecuter.Tables;

namespace Ornament.EasySqlExecuter.SqlGenerators
{
    public abstract class InsertSql : SqlGenerator
    {
        protected InsertSql()
            : base(CommandType.Insert)
        {
        }

        public override string Generate(SqlExecuteItem sqlExecuteItem, out List<DbParameter> dataParameters)
        {
            dataParameters = CreateParameters(sqlExecuteItem);

            // rebuild value string express.

            IEnumerable<string> parameterName = from parameter in dataParameters
                                                select parameter.CreateParameterName(sqlExecuteItem.DataBaseType);

            string valueExpress = String.Format("VALUES ({0})", String.Join(",", parameterName.ToArray()));

            // build field 
            string columnsStringExpress = null;
            if (sqlExecuteItem.Table.Columns.Count != 0 && !String.IsNullOrEmpty(sqlExecuteItem.Table.Columns[0].Name))
            {
                string[] normalColumn = (sqlExecuteItem.Table.Columns.Select(col => col.Name)).ToArray();
                columnsStringExpress = String.Join(",", normalColumn);
            }
            var result = new StringBuilder();
            result.Append("INSERT INTO ").Append(sqlExecuteItem.Table.TableName).Append(" ");
            if (columnsStringExpress != null)
            {
                result.Append("(").Append(columnsStringExpress).Append(")");
            }
            result.Append(valueExpress);

            if (sqlExecuteItem.Table.PrimaryKey != null)
            {
                result.Append(";");
                result.Append(ForIdentitySql(sqlExecuteItem.Table.PrimaryKey, dataParameters));
            }
            return result.ToString();
        }


        //public void Check(SqlExecuteItem sqlExecuteItem)
        //{
        //    if (sqlExecuteItem.Table.Columns.Count != 0 &&
        //        sqlExecuteItem.Table.Columns.Count != sqlExecuteItem.ValueSetList[0].Count())
        //    {
        //        throw new Exception("字段和数值的数量不相同");
        //    }
        //}

        protected abstract String ForIdentitySql(PrimaryKey id, List<DbParameter> dataParameters);

        private static List<DbParameter> CreateParameters(SqlExecuteItem item)
        {
            var result = new List<DbParameter>();
            bool isColumnDefined = !String.IsNullOrEmpty(item.Table.Columns[0].Name);
            int i = 0;
            foreach (Column column in item.Table.Columns)
            {
                var parameter = new DbParameter(isColumnDefined ? column.Name : ("parameter" + i));
                result.Add(parameter);
                parameter.Values.AddRange(column.Values);
                i++;
            }
            return result;
        }

        //protected override void ExecuteAll(SqlExecuter execute, InsertExecuteItem SqlExecuteItem, string sql,
        //                                List<IDataParameter> dataParameters)
        //{
        //    if (SqlExecuteItem.ValueSetList.Count != 0)
        //    {
        //        if (SqlExecuteItem.PrimaryKey == null)
        //        {
        //            SqlExecuteItem.SqlExecuter.ExecuteNonQuery(sql, dataParameters, SqlExecuteItem.ValueSetList);
        //        }
        //        else
        //        {
        //            List<object> primaryKeySet = SqlExecuteItem.SqlExecuter.ExecuteScalar(sql, dataParameters,
        //                                                                               SqlExecuteItem.ValueSetList);

        //            if (SqlExecuteItem.PrimaryKey != null)
        //            {
        //                SqlExecuteItem.PrimaryKey.NotificateForgineKey(primaryKeySet.ToArray());
        //            }
        //        }
        //    }
        //    else
        //    {
        //        SqlExecuteItem.SqlExecuter.ExecuteNonQuery(sql);
        //    }
        //}
    }
}