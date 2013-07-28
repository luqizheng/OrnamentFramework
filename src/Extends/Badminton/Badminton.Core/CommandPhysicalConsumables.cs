using Badminton.Consumableses;

namespace Badminton
{
    /// <summary>
    /// 请主要使用这个消耗品作为分配例子。其他的用户扩展使用。
    /// </summary>
    public class CommandPhysicalConsumables : PhysicalConsumables<CommandPhysicalConsumables>
    {
        public CommandPhysicalConsumables(decimal balance, IOwner owner)
            : base(balance, owner)
        {
        }

        protected override IPhysicalConsumables CreatePhysicalConsumables(decimal balance, Member member)
        {
            return new CommandPhysicalConsumables(balance, member);
        }
    }
}