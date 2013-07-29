using Badminton.Consumableses;
using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings.Consumableses
{
    public class BrandMapping : ClassMap<Brand>
    {
        public BrandMapping()
        {
            Table("Bad_Brand");
            Id(s => s.Id).GeneratedBy.Native();
            Map(s => s.Name);
        }
    }
}