using FluentNHibernate.Mapping;

namespace Qi.Attendance.Dao.NhImple.Mapping
{
    public class EquipmentMapping : ClassMap<Equipment>
    {
        public EquipmentMapping()
        {
            Table("Attendance_Equipment");
            this.Id(x => x.Id).GeneratedBy.Guid();
            this.Map(x => x.TerminalId).Length(64);
            this.Map(x => x.Remark).Length(200);
        }
    }
}