using FluentNHibernate.Mapping;

namespace Ornament.Regions.Dao.NHibernateImple.Mappings
{
    public class ProvinceMapping : ClassMap<Province>
    {
        public ProvinceMapping()
        {
            Table("region_province");
            Id(s => s.Id).GeneratedBy.Assigned();
            Map(s => s.Name).Length(100);
        }
    }
}