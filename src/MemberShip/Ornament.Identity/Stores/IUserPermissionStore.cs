using System.Collections.Generic;
using Ornament.Domain.Stores;

namespace Ornament.Identity.Stores
{
    public interface IUserPermissionStore<in TUser, TUserId>
        : IStore<Permission, int>
        where TUser : IdentityUser<TUserId>

    {
        IList<Permission> GetByUser(TUser user);
    }
}