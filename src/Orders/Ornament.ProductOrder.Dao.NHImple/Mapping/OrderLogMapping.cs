using FluentNHibernate.Mapping;

namespace Ornament.ProductOrder.Dao.NHImple.Mapping
{
    public class OrderLogMapping : ClassMap<OrderLog>
    {
        public OrderLogMapping()
        {
            Table("po_OrderLog");
            Id(s => s.Id).GeneratedBy.Increment();
            Map(s => s.CreateTime);
            Map(s => s.Src).Length(255);

        }
    }
} 