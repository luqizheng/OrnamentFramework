using FluentNHibernate.Mapping;

namespace Ornament.Regions.Dao.NHibernateImple.Mappings
{
    public class DistrictMapping : ClassMap<District>
    {
        public DistrictMapping()
        {
            Table("region_district");
            Id(s => s.Id).GeneratedBy.Assigned().Length(36);
            Map(s => s.Name).Length(100).Index("region_district_Name_itx");
            References(s => s.City).Not.Nullable();
        }
    }
}