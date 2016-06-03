using System.Collections.Generic;
using Ornament.Domain.Stores;
using System;

namespace Ornament.Identity.Stores
{
    public interface IUserPermissionStore<in TUser, TKey, TUserClaim, TUserRole, TUserLogin>
        : IStore<Permission, int>
        where TUser : IdentityUser<TKey, TUserClaim, TUserRole, TUserLogin>
        where TKey : IEquatable<TKey>

    {
        IList<Permission> GetByUser(TUser user);
    }
}