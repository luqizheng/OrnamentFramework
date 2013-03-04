using System;
using FluentNHibernate.Mapping;
using Qi.NHibernateExtender.Types;

namespace Qi.Attendance.Dao.NhImple.Mapping
{
    public class DayOfWeekWorkTimeMapping : ClassMap<DayOfWeekWorkTime>
    {
        public DayOfWeekWorkTimeMapping()
        {
            Table("Attendance_DayOfWeekWorkTime");
            Id(x => x.Id).GeneratedBy.Guid().UnsavedValue(Guid.Empty);
            HasMany(x => x.WorkTimes).LazyLoad()
                .Table("Attendance_DayOfWeekWorkTime_Period")
                .KeyColumn("DayOfWeekWorkTimeId")
                .Component(comp =>
                {
                    comp.Map(x => x.StartTime).CustomType<TimeType>();
                    comp.Map(x => x.EndTime).CustomType<TimeType>();
                }).Cascade.All();
        }
    }
}