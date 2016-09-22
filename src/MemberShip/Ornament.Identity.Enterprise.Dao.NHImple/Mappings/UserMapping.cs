using System;
using Ornament.Identity.Dao.NhImple.Mapping;
using Ornament.Identity.Enterprise;

namespace Ornament.Identity.Dao.NhImple.Mappings
{
    public class UserEnterpriseMapping<TUser, TKey, TRole> :
        IdentityUserMapping<TUser, TKey, TRole>
        where TUser : User<TKey, TRole>
        where TKey : IEquatable<TKey>
     
    {
        protected override void ExtendSetting()
        {
            References(s => s.Org);
        }
    }
}