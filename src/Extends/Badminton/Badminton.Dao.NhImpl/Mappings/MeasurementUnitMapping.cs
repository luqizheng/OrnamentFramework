using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class MeasurementUnitMapping : ClassMap<MeasurementUnit>
    {
        public MeasurementUnitMapping()
        {
            this.Table("Bad_MeasurementUnit");
            this.Id(s => s.Id);
            this.Map(s => s.DecimalName);
            this.Map(s => s.IntegerName);
        }

    }
}