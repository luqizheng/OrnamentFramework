using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class YardMapping : ClassMap<Yard>
    {
        public YardMapping()
        {
            this.Table("Bad_Yard");
            this.Id(s => s.Id).GeneratedBy.Identity();
            this.Map(s => s.Name).Length(50);
            this.References(s => s.Type);
            
        }
    }
}