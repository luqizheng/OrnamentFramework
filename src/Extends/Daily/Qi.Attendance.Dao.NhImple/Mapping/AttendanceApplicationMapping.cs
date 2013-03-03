using FluentNHibernate.Mapping;
using Qi.NHibernateExtender.Types;

namespace Qi.Attendance.Dao.NhImple.Mapping
{
    public class AttendanceApplicationMapping : ClassMap<AbsentApplication>
    {
        public AttendanceApplicationMapping()
        {
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            Map(x => x.CreateTime);
            Map(x => x.Date);
            References<Employee>(x => x.Employee);
            this.Component(s => s.Period,
                           s =>
                           {
                               s.Map(x => x.Start).CustomType<TimeStringType>();
                               s.Map(x => x.End).CustomType<TimeStringType>();
                           });
        }

    }
}