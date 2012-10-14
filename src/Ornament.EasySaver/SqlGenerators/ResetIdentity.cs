using NHibernate.Driver;
using Ornament.EasySqlExecuter.ExecuteItems;

namespace Ornament.EasySqlExecuter.SqlGenerators
{
    public abstract class ResetIdentity : CommandGenerator<ResetIdentitySqlExecuteItem>
    {
        protected ResetIdentity(IDriver execute) : base(execute)
        {
        }

        public int Reseed { get; set; }
    }
}