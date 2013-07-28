using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class ModelMapping : ClassMap<Model>
    {
        public ModelMapping()
        {
            Table("Bad_Model");
            Id(s => s.Id).GeneratedBy.Native();

            Map(s => s.Prefix);
            Map(s => s.Name);
            Map(s => s.Suffix);

            References(s => s.Brand);

            Map(s => s.ConsumablesType);


        }
    }
}