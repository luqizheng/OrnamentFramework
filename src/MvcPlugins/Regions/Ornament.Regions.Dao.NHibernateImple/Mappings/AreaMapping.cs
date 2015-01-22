using FluentNHibernate.Mapping;

namespace Ornament.Regions.Dao.NHibernateImple.Mappings
{
    public class AreaMapping : ClassMap<District>
    {
        public AreaMapping()
        {
            Table("region_area");
            Id(s => s.Id).GeneratedBy.Assigned().Length(36);
            Map(s => s.Name).Length(100).Index("region_Name_itx");
            References(s => s.City).Not.Nullable();
        }
    }
}