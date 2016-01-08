using FluentNHibernate.Conventions.Inspections;
using FluentNHibernate.Mapping;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao.Mapping
{
    public class IdentityRoleMap<T,TID> : ClassMap<T> where T:IdentityRole<TID>
    {
        public IdentityRoleMap(string table="orn_mbs_roles")
        {
            Table(table);
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            Map(x => x.Name).Unique().Length(255).Not.Nullable();
        }
    }
}