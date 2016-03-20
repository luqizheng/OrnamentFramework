using System;
using System.Collections.Generic;
using Ornament.Domain.Uow;
using Ornament.Identity.Stores;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao
{
    public class PermissionStore<T, TUser, TUserId, TRole, TRoleId>
        : Store<T, int>
        , IUserPermissionStore<T, TUser, TUserId, TRole, TRoleId>,
        IPermissionStore
        where T : Permission<TRole, TRoleId>
        where TRole : IdentityRole<TRoleId>
        where TUser : IdentityUser<TUserId, TRole, TRoleId>

    {
        public PermissionStore(IUnitOfWork context) : base(context)
        {
        }

       
        IList<IPermission> IUserPermissionStore<T, TUser, TUserId, TRole, TRoleId>.GetByUser(TUser user)
        {
            throw new NotImplementedException();
        }

        public IList<IPermission> Find(object userId)
        {
            throw new NotImplementedException();
        }
    }
}