using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class MeasurementUnitMapping : ClassMap<MeasurementUnit>
    {
        public MeasurementUnitMapping()
        {
            Table("Bad_MeasurementUnit");
            Id(s => s.Id).GeneratedBy.Increment();
            Map(s => s.DecimalName);
            Map(s => s.IntegerName);
            Map(s => s.Adecimal);
        }
    }
}