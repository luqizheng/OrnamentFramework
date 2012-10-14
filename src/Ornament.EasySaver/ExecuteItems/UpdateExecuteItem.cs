using Ornament.EasySqlExecuter.SqlGenerators;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    public class UpdateExecuteItem : GenericSaveExecuteItem<UpdateExecuteItem>
    {
        public UpdateExecuteItem(DataHelper helper, string tableName) : base(helper, tableName)
        {
        }

        public override CommandType CommandType
        {
            get { return CommandType.Update; }
        }

        protected internal override void RunSql(SqlExecuter executer)
        {
            var update = new UpdateSql(executer);
            update.Execute(this);
        }
    }
}