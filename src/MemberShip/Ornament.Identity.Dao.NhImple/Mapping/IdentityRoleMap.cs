using FluentNHibernate.Conventions.Inspections;
using FluentNHibernate.Mapping;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao.Mapping
{
    public abstract class IdentityRoleMap<T,TID> : ClassMap<T> where T:IdentityRole<TID>
    {
        protected IdentityRoleMap(string table="orn_mbs_roles")
        {
            Table(table);
            Map(x => x.Name).Unique().Length(255).Not.Nullable();
        }

        protected abstract void Identity();

    }
}