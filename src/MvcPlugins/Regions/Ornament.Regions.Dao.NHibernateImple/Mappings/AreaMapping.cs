using FluentNHibernate.Mapping;

namespace Ornament.Regions.Dao.NHibernateImple.Mappings
{
    public class AreaMapping : ClassMap<Area>
    {
        public AreaMapping()
        {
            Table("region_area");
            Id(s => s.Id).GeneratedBy.Assigned().Length(36);
            Map(s => s.Name).Length(100);
            References(s => s.City).Not.Nullable();
        }
    }
}