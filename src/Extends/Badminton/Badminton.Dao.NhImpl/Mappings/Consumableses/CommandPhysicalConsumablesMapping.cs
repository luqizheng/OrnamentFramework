using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings.Consumableses
{
    public class CommandPhysicalConsumablesMapping:SubclassMap<CommandPhysicalConsumablesMapping>
    {
        public CommandPhysicalConsumablesMapping()
        {
            Table("Bad_comPhyConsumables");
            this.DiscriminatorValue("PhyConsumables");
        }
    }
}