using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class ConsumablesHistoryMapping : ClassMap<ConsumablesHistory>
    {
        public ConsumablesHistoryMapping()
        {
            this.Table("Bad_ConsumablesHis");
            this.Id(s => s.Id);
            this.Map(x => x.Amount);
            this.Map(x => x.CreateTime);
            this.Map(x => x.Remarks);

            this.References(s => s.Consumables);
        }
    }
}