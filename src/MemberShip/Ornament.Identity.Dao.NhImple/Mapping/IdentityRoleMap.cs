using FluentNHibernate.Conventions.Inspections;
using FluentNHibernate.Mapping;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao.Mapping
{
    public class IdentityRoleMap : ClassMap<IdentityRole>
    {
        public IdentityRoleMap()
        {
            Table("orn_AspNetRoles");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            Map(x => x.Name).Unique().Length(255).Not.Nullable();
        }
    }
}