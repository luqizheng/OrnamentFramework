using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ornament.Identity.Dao.NhImple.Mapping;
using FluentNHibernate.Mapping;
using Ornament.Identity.Enterprise;

namespace Ornament.Identity.Dao.NhImple.Mappings
{
    public class UserEnterpriseMapping<TUser, TKey, TRole> : IdentityUserMapping<TUser, TKey, TRole>
         where TUser : Ornament.Identity.Enterprise.User<TKey, TRole>
        where TKey : IEquatable<TKey>
    {
        protected override void ExtendSetting()
        {
            this.References(s => s.Org);
        }
    }

    public class OrgMapping : ClassMap<Org>
    {
        public OrgMapping()
        {
            this.Id(_ => _.Id).GeneratedBy.Increment();
            this.Map(_ => _.Name);
            this.Map(_ => _.Remark);
        }
    }
}
