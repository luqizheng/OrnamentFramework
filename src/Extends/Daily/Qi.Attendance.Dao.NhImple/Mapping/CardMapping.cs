using FluentNHibernate.Mapping;

namespace Qi.Attendance.Dao.NhImple.Mapping
{
    public class CardMapping : ClassMap<Card>
    {
        public CardMapping()
        {
            this.Table("Card");
            Id(x => x.Id).GeneratedBy.UuidHex("N");

            Map(x => x.Number).Length(19);
            Map(x => x.State);
            References(x => x.Employee);
        }
    }
}