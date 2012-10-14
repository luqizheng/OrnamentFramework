using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Ornament.EasySqlExecuter.ExecuteItems;

namespace Ornament.EasySqlExecuter.SqlGenerators
{
    public sealed class UpdateSql : CommandGenerator<UpdateExecuteItem>
    {
        public UpdateSql(SqlExecuter execute) : base(execute)
        {
        }


        protected override StringBuilder Generate(UpdateExecuteItem executeItem,
                                                  out List<IDataParameter> dataParameters)
        {
            dataParameters = new List<IDataParameter>();
            var result = new StringBuilder(String.Format("UPDATE {0} set ", executeItem.TableName));

            var settingExpression = new string[executeItem.ColumnsList.Count];
            int index = 0;
            foreach (string column in  executeItem.ColumnsList)
            {
                settingExpression[index] = String.Format("{0}=@{0}", column);
                dataParameters.Add(executeItem.SqlExecuter.CreateParameter("@" + column));
                index++;
            }
            result.Append(String.Join(",", settingExpression));
            return result;
        }

        public override void Check(SqlExecuteItem sqlExecuteItem)
        {
            var item = (UpdateExecuteItem) sqlExecuteItem;
            if (sqlExecuteItem.ColumnsList.Count != 0 && item.ValueSetList.Count != 0 &&
                sqlExecuteItem.ColumnsList.Count != item.ValueSetList[0].Count)
                throw new Exception(String.Format("Columns(count={0})的数目和Values(count={1})定义的不一致",
                                                  sqlExecuteItem.ColumnsList.Count,
                                                  item.ValueSetList[0].Count));
        }

        protected override void Execute(SqlExecuter execute, UpdateExecuteItem executeItem, string sql,
                                        List<IDataParameter> dataParameters)
        {
        }
    }
}