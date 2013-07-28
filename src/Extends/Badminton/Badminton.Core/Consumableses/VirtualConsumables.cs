using Qi.Domain;

namespace Badminton.Consumableses
{
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
        ///     购买虚拟物品的实际价格
        /// </summary>
        public decimal Price { get; set; }
    }
}