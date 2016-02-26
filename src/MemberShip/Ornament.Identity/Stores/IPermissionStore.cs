using System.Collections.Generic;

namespace Ornament.Identity.Stores
{
    public interface IPermissionStore<T, TUser, TUserId, TRole, TId>
        : Ornament.Domain.Stores.IStore<T, int>
        
        where T : Permission<TRole, TId>
        where TRole : IdentityRole<TId>
        where TUser : IdentityUser<TUserId, TRole, TId>

    {
        IList<T> GetByUser(TUser user);



    }

}