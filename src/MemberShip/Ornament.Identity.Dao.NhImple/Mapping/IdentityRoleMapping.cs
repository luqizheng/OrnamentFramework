using FluentNHibernate.Mapping;

namespace Ornament.Identity.Dao.Mapping
{
    public class IdentityRoleMapping<T, TId> : ClassMap<T> where T : IdentityRole
    {
        public IdentityRoleMapping(string table = "orn_mbs_roles")
        {
            Table(table);
            Map(x => x.Name).Unique().Length(255).Not.Nullable();
            Id(s => s.Id).GeneratedBy.SequenceIdentity();
            Map(x => x.NormalizedName).Length(255);
        }
    }
}