using System.Collections.Generic;
using Ornament.Domain.Stores;

namespace Ornament.Identity.Stores
{
    public interface IUserPermissionStore<T, in TUser, TUserId, TRole, TRoleId>
        : IStore<T, int>
        where T : Permission<TRole, TRoleId>
        where TRole : IdentityRole<TRoleId>
        where TUser : IdentityUser<TUserId, TRole, TRoleId>

    {
        IList<IPermission> GetByUser(TUser user);
    }

    public interface IPermissionStore
    {
        IList<IPermission> Find(object userId);
    }

}