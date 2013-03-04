using FluentNHibernate.Mapping;

namespace Qi.Attendance.Dao.NhImple.Mapping
{
    public class EmployeeMapping : ClassMap<Employee>
    {
        public EmployeeMapping()
        {
            this.Table("Attendance_Employee");
            this.Id(x => x.Id).GeneratedBy.Guid();
            this.References(x => x.EmployeeGroup);
            this.Map(x => x.Name);
        }
    }
}