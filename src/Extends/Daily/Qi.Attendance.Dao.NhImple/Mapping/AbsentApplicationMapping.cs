using FluentNHibernate.Mapping;
using Qi.NHibernateExtender.Types;

namespace Qi.Attendance.Dao.NhImple.Mapping
{
    public class AbsentApplicationMapping : ClassMap<AbsentApplication>
    {
        public AbsentApplicationMapping()
        {
            Table("Attendance_AbsentApplication");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            Map(x => x.CreateTime);
            Map(x => x.Date);
            References(x => x.Employee);
            Component(property => property.Period,
                      mapping =>
                      {
                          mapping.Map(x => x.EndTime).CustomType<TimeStringType>();
                          mapping.Map(x => x.StartTime).CustomType<TimeStringType>();
                      });
        }
    }
}