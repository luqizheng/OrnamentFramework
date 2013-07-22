using System;
using Qi.Domain;

namespace Badminton
{
    /// <summary>
    /// 消耗品历史记录
    /// </summary>
    public class ConsumablesHistory : DomainObject<ConsumablesHistory, int>
    {
        protected ConsumablesHistory()
        {
        }

        public ConsumablesHistory(IConsumables consumables, decimal amount)
        {
            CreateTime = DateTime.Now;
            Consumables = consumables;
            Amount = amount;
        }
        /// <summary>
        /// 消耗品
        /// </summary>
        public IConsumables Consumables { get; protected set; }
        /// <summary>
        /// 消耗品小号数量
        /// </summary>
        public decimal Amount { get; protected set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; protected set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remarks { get; set; }
    }

}