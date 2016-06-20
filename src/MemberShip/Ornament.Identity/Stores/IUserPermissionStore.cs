using System.Collections.Generic;
using Ornament.Domain.Stores;
using System;

namespace Ornament.Identity.Stores
{
    public interface IUserPermissionStore<in TUser, TKey, TUserClaim, TUserRole, TUserLogin>
        : IStore<Permission, int>
        where TUser : IdentityUser<TKey, TUserRole, TUserClaim, TUserLogin>
        where TKey : IEquatable<TKey>
        where TUserRole : IdentityRole<TKey>
        where TUserClaim : IdentityUserClaim<TKey>
        where TUserLogin : IdentityUserLogin<TKey>
    {
        IList<Permission> GetByUser(TUser user);
    }
}