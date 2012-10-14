using Ornament.EasySqlExecuter.SqlGenerators;
using Ornament.EasySqlExecuter.SqlGenerators.Oracle;
using Ornament.EasySqlExecuter.SqlGenerators.SqlServer;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    public class ResetIdentityExecuteItem : GenericExecuteItem<ResetIdentityExecuteItem>
    {
        public ResetIdentityExecuteItem(DataHelper helper, string tableName, int resetNumber)
            : base(helper, tableName)
        {
            ResetNumber = resetNumber;
        }

        public int ResetNumber { get; set; }

        public override CommandType CommandType
        {
            get { return CommandType.ResetId; }
        }

        protected internal override void RunSql(SqlExecuter executer)
        {
            ResetIdentity result;
            switch (DataBaseType)
            {
                case DatabaseType.Oracle:
                    result = new ResetIdentityOracle(executer);
                    break;
                default:
                    result = new ResetIdentitySqlServer(executer);
                    break;
            }
            result.Reseed = ResetNumber;

            result.Execute(this);
        }
    }
}