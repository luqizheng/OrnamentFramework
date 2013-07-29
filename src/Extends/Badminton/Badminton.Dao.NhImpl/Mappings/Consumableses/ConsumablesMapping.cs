using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings.Consumableses
{
    public class ConsumablesMapping : ClassMap<IConsumables>
    {
        public ConsumablesMapping()
        {
            Table("Bad_Consumables");
            Id(s => s.Id).GeneratedBy.Native();
            this.DiscriminateSubClassesOnColumn("Kind");


            Map(x => x.Balance);
            Map(x => x.CreateTime);
            Map(x => x.UnitPrice);

            References(x => x.Model);
            this.ReferencesAny(s => s.Owner)
                .EntityTypeColumn("entitType")
                .EntityIdentifierColumn("entityId")
                .IdentityType<string>()
                .AddMetaValue<Member>("Member")
                .AddMetaValue<MemberGroup>("MemberGroup");
        }
    }
}