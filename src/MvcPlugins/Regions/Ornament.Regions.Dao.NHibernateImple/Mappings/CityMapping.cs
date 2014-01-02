using FluentNHibernate.Mapping;

namespace Ornament.Regions.Dao.NHibernateImple.Mappings
{
    public class CityMapping : ClassMap<City>
    {
        public CityMapping()
        {
            Table("region_city");
            Id(s => s.Id).GeneratedBy.Assigned();
            Map(s => s.Name).Length(100);
            References(s => s.Province).Not.Nullable();
        }
    }
}