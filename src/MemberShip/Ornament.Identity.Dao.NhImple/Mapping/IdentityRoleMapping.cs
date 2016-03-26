using FluentNHibernate.Mapping;

namespace Ornament.Identity.Dao.Mapping
{
    public class IdentityRoleMapping : ClassMap<IdentityRole>
    {
        public IdentityRoleMapping()
        {
            Table("orn_mbs_roles");
            Map(x => x.Name).Unique().Length(255).Not.Nullable();
            Id(s => s.Id).GeneratedBy.SequenceIdentity();
            Map(x => x.NormalizedName).Length(255);
        }
    }
}