using System;
using System.Data.SqlClient;
using System.Security;
using Ornament.ProductOrder.Dao;
using Qi.Domain;

namespace Ornament.ProductOrder
{
    public class Order : DomainObject<Order, int>
    {
        public Order(OrderStatus status)
        {
            Status = status;
        }

        public virtual string Number { get; set; }
        public virtual string Remarks { get; set; }
        public virtual DateTime? CreateTime { get; set; }

        public virtual OrderStatus Status { get; protected set; }

        public void ChangeStatus(OrderStatus newStatus, IProductOrderDaoFactory daoFactory)
        {
            OrderLog log=new OrderLog(this.Status,newStatus);
            daoFactory.CreateOrderLogDao().SaveOrUpdate(log);
            this.Status = newStatus;

            daoFactory.CreateOrderDao().SaveOrUpdate(this);
        }
    }
}