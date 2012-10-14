using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Ornament.EasySqlExecuter.ExecuteItems;

namespace Ornament.EasySqlExecuter.SqlGenerators
{
    public class SelectSql : CommandGenerator<SelectExecuteItem>
    {
        public SelectSql(SqlExecuter execute) : base(execute)
        {
        }

        protected override StringBuilder Generate(SelectExecuteItem executeItem, out List<IDataParameter> dataParameters)
        {
            dataParameters = new List<IDataParameter>();

            var result = new StringBuilder("select ");

            if (executeItem.ColumnsList.Count != 0)
            {
                result.Append(String.Join(",", executeItem.ColumnsList.ToArray()));
            }
            else
            {
                result.Append(" * ");
            }

            result.Append(" from ").Append(executeItem.TableName);

            if (executeItem.Fields.Count != 0)
            {
                result.Append(" where ");
                bool first = true;
                foreach (Field field in executeItem.Fields)
                {
                    if (!first)
                    {
                        result.Append(String.Format(" {0} ", field.Join));
                    }
                    else
                    {
                        first = false;
                    }
                    result.Append(String.Format("{0}=@{0}", field.Name));
                    dataParameters.Add(executeItem.SqlExecuter.CreateParameter("@" + field.Name));
                }
            }

            return result;
        }

        public override void Check(SqlExecuteItem sqlExecuteItem)
        {
        }

        protected override void Execute(SqlExecuter execute, SelectExecuteItem executeItem, string sql,
                                        List<IDataParameter> dataParameters)
        {
            IDataReader reader = dataParameters.Count == 0
                                     ? executeItem.SqlExecuter.ExecuteReader(sql)
                                     : executeItem.SqlExecuter.ExecuteReader(sql, dataParameters,
                                                                             executeItem.ValueSetList);

            using (reader)
            {
                int current = 0;
                while (reader.Read())
                {
                    if (current == 0)
                    {
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            executeItem.DataTable.Columns.Add(new DataColumn(reader.GetName(i)));
                        }
                    }

                    DataRow row = executeItem.DataTable.NewRow();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        row[i] = reader.GetValue(i);
                    }
                    executeItem.DataTable.Rows.Add(row);
                    current++;
                }
            }
        }
    }
}