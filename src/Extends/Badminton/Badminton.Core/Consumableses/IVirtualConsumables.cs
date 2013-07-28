namespace Badminton.Consumableses
{
    /// <summary>
    ///     虚拟消耗品，如优惠卡
    /// </summary>
    public interface IVirtualConsumables : IConsumables
    {
        /// <summary>
        ///     购买虚拟物品的实际价格
        /// </summary>
        decimal Price { get; set; }
    }
}