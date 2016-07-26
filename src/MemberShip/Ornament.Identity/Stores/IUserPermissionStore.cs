using System.Collections.Generic;
using Ornament.Domain.Stores;
using System;

namespace Ornament.Identity.Stores
{
    public interface IUserPermissionStore<in TUser, TKey,  TUserRole>
        : IStore<Permission, int>
        where TUser : IdentityUser<TKey, TUserRole>
        where TKey : IEquatable<TKey>
       
   
    {
        IList<Permission> GetByUser(TUser user);
    }
}