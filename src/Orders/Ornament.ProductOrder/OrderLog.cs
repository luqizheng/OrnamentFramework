using System;
using Qi.Domain;

namespace Ornament.ProductOrder
{
    public class OrderLog : DomainObject<OrderLog, int>
    {
        protected OrderLog()
        {
            CreateTime = DateTime.Now;
        }

        public OrderLog(OrderStatus src, OrderStatus target)
            : this()
        {
            Src = src;
            Target = target;
        }

        public virtual string User { get; set; }
        public virtual DateTime CreateTime { get; protected internal set; }
        public virtual OrderStatus Src { get; set; }
        public virtual OrderStatus Target { get; set; }
        public virtual string Remarks { get; set; }
    }
}