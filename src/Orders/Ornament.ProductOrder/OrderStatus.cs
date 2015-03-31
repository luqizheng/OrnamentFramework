using System;
using Qi.Domain;

namespace Ornament.ProductOrder
{
    public class OrderStatus : DomainObject<OrderStatus, int>
    {
        public virtual string Name { get; set; }

        public virtual string Remarks { get; set; }

        /// <summary>
        ///     位置按照从小到大执行，一开始的状态为0，后面慢慢增加。
        /// </summary>
        public virtual int OrderId { get; set; }

        public override string ToString()
        {
            return !String.IsNullOrEmpty(Name) ? Name : base.ToString();
        }
    }
}