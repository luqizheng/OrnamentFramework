using FluentNHibernate.Mapping;

namespace Qi.Attendance.Dao.NhImple.Mapping
{
    public class CheckHistoryMapping : ClassMap<CheckHistory>
    {
        public CheckHistoryMapping()
        {
            this.Table("Attendance_CheckHistory");
            this.Id(x => x.Id).GeneratedBy.UuidHex("N");
            this.Map(x => x.SignTime).Length(30);
            this.Map(x => x.CardNo).Length(19);
            this.Map(x => x.Type);

        }
    }
}