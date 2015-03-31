using FluentNHibernate.Mapping;

namespace Ornament.ProductOrder.Dao.NHImple.Mapping
{
    public class OrderStatusMapping : ClassMap<OrderStatus>
    {
        public OrderStatusMapping()
        {
            Table("po_orderStatus");
            Id(s => s.Name);
            Map(s => s.OrderId);
            Map(s => s.Remarks).Length(255);
        }
    }
}