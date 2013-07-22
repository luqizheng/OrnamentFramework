using Qi.Domain;

namespace Badminton
{
    /// <summary>
    ///     虚拟消耗品，如优惠卡
    /// </summary>
    public interface IVirtualConsumables : IConsumables
    {
        /// <summary>
        /// 购买虚拟物品的实际价格
        /// </summary>
        decimal Price { get; set; }
    }

    public abstract class VirtualConsumables<T> : Consumables<T>, IVirtualConsumables where T : DomainObject<T, int>
    {
        protected VirtualConsumables()
        {
        }

        protected VirtualConsumables(decimal balance, IOwner owner)
            : base(balance, owner)
        {
        }
        /// <summary>
        /// 购买虚拟物品的实际价格
        /// </summary>
        public decimal Price { get; set; }
    }
}