using FluentNHibernate.Mapping;

namespace Ornament.ProductOrder.Dao.NHImple.Mapping
{
    public class OrderMapping : ClassMap<Order>
    {
        public OrderMapping()
        {
            Table("po_order");
            Id(s => s.Id).GeneratedBy.Increment();
            Map(s => s.Number);
            References(s => s.Status);
            Map(s => s.Remarks).Length(512);
        }
    }
}