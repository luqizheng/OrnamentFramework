using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using NHibernate.Driver;
using Ornament.EasySqlExecuter.ExecuteItems;

namespace Ornament.EasySqlExecuter.SqlGenerators.SqlServer
{
    public class ResetIdentitySqlServer : ResetIdentity
    {
        public ResetIdentitySqlServer(IDriver execute) : base(execute)
        {
        }

        protected override StringBuilder Generate(ResetIdentitySqlExecuteItem executeItem,
                                                  out List<IDataParameter> dataParameters)
        {
            dataParameters = new List<IDataParameter>();
            return new StringBuilder(String.Format("DBCC CHECKIDENT ({0}, reseed, {1})", executeItem.TableName, Reseed));
        }

        public override void Check(SqlExecuteItem sqlExecuteItem)
        {
        }

       
    }
}