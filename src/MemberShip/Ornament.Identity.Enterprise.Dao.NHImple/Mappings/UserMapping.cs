using System;
using FluentNHibernate.Mapping;
using Ornament.Identity.Dao.NhImple.Mapping;
using Ornament.Identity.Enterprise;

namespace Ornament.Identity.Dao.NhImple.Mappings
{
    public class UserEnterpriseMapping<TUser, TKey, TRole> : IdentityUserMapping<TUser, TKey, TRole>
        where TUser : User<TKey, TRole>
        where TKey : IEquatable<TKey>
    {
        protected override void ExtendSetting()
        {
            References(s => s.Org);
        }
    }

    public class OrgMapping : ClassMap<Org>
    {
        public OrgMapping()
        {
            Id(_ => _.Id).GeneratedBy.Increment();
            Map(_ => _.Name);
            Map(_ => _.Remark);
            References(s => s.Parent).Column("OrgParentId").ForeignKey("OrgParentFK");
        }
    }
}