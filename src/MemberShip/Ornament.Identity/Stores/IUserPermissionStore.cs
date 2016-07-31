using System.Collections.Generic;
using Ornament.Domain.Stores;
using System;

namespace Ornament.Identity.Stores
{
    public interface IUserPermissionStore<in TUser, TKey,  TUserRole>
        : IStore<Permission<TUserRole>, int>
        where TUser : IdentityUser<TKey, TUserRole>
        where TKey : IEquatable<TKey>
       
   
    {
        IList<Permission<TUserRole>> GetByUser(TUser user);
    }
}