using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class MeasurementUnitMapping : ClassMap<MeasurementUnit>
    {
        public MeasurementUnitMapping()
        {
            this.Table("Bad_MeasurementUnit");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            this.Map(s => s.DecimalName);
            this.Map(s => s.IntegerName);
            this.Map(s => s.Adecimal);
        }


    }
}