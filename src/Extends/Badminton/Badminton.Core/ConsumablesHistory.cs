using System;
using Qi.Domain;

namespace Badminton
{
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

        public IConsumables Consumables { get; protected set; }
        public decimal Amount { get; protected set; }
        public DateTime CreateTime { get; protected set; }
        public string Remarks { get; set; }
    }
}