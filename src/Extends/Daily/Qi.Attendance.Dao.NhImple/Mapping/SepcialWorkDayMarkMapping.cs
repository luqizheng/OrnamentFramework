using FluentNHibernate.Mapping;
using Qi.NHibernateExtender.Types;

namespace Qi.Attendance.Dao.NhImple.Mapping
{
    public class SepcialWorkDayMarkMapping : ClassMap<SpecialWorkDayMark>
    {
        public SepcialWorkDayMarkMapping()
        {
            Table("Attendance_SpecialWorkDayMark");
            Id(x => x.Id).GeneratedBy.UuidString();
            Map(x => x.Date);
            HasMany(x => x.Periods).Table("Attendance_SpecialWorkDayMark_Period")
                                   .KeyColumn("DayMarkerId")
                                   .Component(comp =>
                                       {
                                           comp.Map(x => x.StartTime).CustomType<TimeType>();
                                           comp.Map(x => x.EndTime).CustomType<TimeType>();
                                       });
        }

    }
}