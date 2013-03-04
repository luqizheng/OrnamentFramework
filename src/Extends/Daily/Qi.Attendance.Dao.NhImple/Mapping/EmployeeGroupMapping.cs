using FluentNHibernate.Mapping;

namespace Qi.Attendance.Dao.NhImple.Mapping
{
    public class EmployeeGroupMapping : ClassMap<EmployeeGroup>
    {
        public EmployeeGroupMapping()
        {
            this.Table("Attendance_EmployeeGroup");
            this.Id(x => x.Id).GeneratedBy.Guid();
            this.Map(x => x.Remark).Length(200);
            this.Map(x => x.Name).Length(30);
            this.HasManyToMany(x => x.Equipments).Cascade.None()
                .Table("Attendance_EmployeeGroupEquipmentRelative")
                .ParentKeyColumn("EmployeeGroupId")
                .ChildKeyColumn("EquipmentId");
            this.Component(x => x.Options, options =>
                {
                    options.HasMany(x1 => x1.SpecialWorkDay).KeyColumn("employeeGroupId");
                    options.HasMany(x1 => x1.WeekSetting).Cascade.All()
                           .Table("Attendance_EmployeeGroupOptions_weekSetting")
                           .AsMap(x => x.DateOfWeek);
                });



        }
    }
}