using Badminton.StockHistories;
using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings.StockHistories
{
    public class StockHistoryMapping:ClassMap<StockHistory>
    {
        public StockHistoryMapping()
        {
            Table("Bad_StockHistory");
            Id(x => x.Id).GeneratedBy.Native();
            Map(x => x.OrderTime);
            Map(x => x.StockAmount);
            Map(x => x.GoodsNumber);
            References(x => x.Buyer);

            References(s => s.Consumables);

        }
    }
}