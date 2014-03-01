using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class PerformerMapping : ClassMap<IPerformer>
    {
        public PerformerMapping()
        {
            Table("MBS_Performer");
            
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);

            DiscriminateSubClassesOnColumn("PerformerType", string.Empty).Not.Nullable().CustomType(typeof(string)).Length(10);
            Map(s => s.Name);
            Map(s => s.Remarks).Length(2000);
            HasManyToMany(s => s.Roles)
                .Table("MBS_PerformerRoleRelation")
                .ParentKeyColumn("PerformerId")
                .ChildKeyColumn("RoleId");
        }
    }
}