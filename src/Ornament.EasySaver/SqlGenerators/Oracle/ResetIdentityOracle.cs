using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Ornament.EasySqlExecuter.ExecuteItems;

namespace Ornament.EasySqlExecuter.SqlGenerators.Oracle
{
    internal class ResetIdentityOracle : ResetIdentity
    {
        public ResetIdentityOracle(SqlExecuter execute) : base(execute)
        {
        }

        protected override StringBuilder Generate(ResetIdentitySqlExecuteItem executeItem,
                                                  out List<IDataParameter> dataParameters)
        {
            throw new NotImplementedException();
        }

        public override void Check(SqlExecuteItem sqlExecuteItem)
        {
            throw new NotImplementedException();
        }

        protected override void Execute(SqlExecuter execute, ResetIdentitySqlExecuteItem executeItem, string sql,
                                        List<IDataParameter> dataParameters)
        {
            throw new NotImplementedException();
        }
    }
}