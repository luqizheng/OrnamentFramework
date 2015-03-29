using System;
using Qi.Domain;

namespace Ornament.ProductOrder
{
    public class Order : DomainObject<Order, string>
    {
        private OrderStatus _status;
        public virtual string Number { get; set; }
        public virtual string Remarks { get; set; }
        public virtual DateTime? CreateTime { get; set; }

        public virtual OrderStatus Status
        {
            get { return _status ?? (_status = new OrderStatus()); }
        }
    }

    public class OrderLog : DomainObject<OrderLog, string>
    {
        public OrderLog()
        {
            CreateTime = DateTime.Now;
        }

        public virtual string User { get; set; }
        public virtual DateTime CreateTime { get; protected internal set; }
        public virtual string Contents { get; set; }
    }

    public class OrderStatus : DomainObject<OrderStatus, int>
    {
        public virtual string Name { get; set; }

        public virtual string Remarks { get; set; }

        /// <summary>
        ///     位置按照从小到大执行，一开始的状态为0，后面慢慢增加。
        /// </summary>
        public virtual int OrderId { get; set; }
    }
}