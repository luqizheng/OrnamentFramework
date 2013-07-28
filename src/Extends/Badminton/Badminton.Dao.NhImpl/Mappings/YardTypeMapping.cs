using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class YardTypeMapping : ClassMap<YardType>
    {
        public YardTypeMapping()
        {
            this.Table("Bad_YardType");
            this.Id(s => s.Id).GeneratedBy.Identity();
            this.Map(s => s.Price);
            this.Map(s => s.Name).Length(50);
        }
    }
}