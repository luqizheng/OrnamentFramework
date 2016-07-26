using System;
using FluentNHibernate.Mapping;

namespace Ornament.Identity.Dao.Mapping
{
    public class IdentityRoleMapping<TRole, TKey> : ClassMap<TRole>
        where TRole : IdentityRole<TKey>
        where TKey : IEquatable<TKey>
    {
        public IdentityRoleMapping()
        {
            Table("mbs_roles");
            Map(x => x.Name).Unique().Length(255).Not.Nullable();

            Map(x => x.NormalizedName).Length(255);

            ExtendSetting();
        }

        public virtual void ExtendSetting()
        {

        }
    }
}