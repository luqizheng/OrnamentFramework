using System;
using System.Collections.Generic;
using Ornament.Domain.Uow;
using Ornament.Identity.Stores;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao
{
    public class PermissionStore<TUser, TUserId, TUserClaim, TUserRole, TUserLogin>
        : Store<Permission, int>
        , IUserPermissionStore<TUser, TUserId, TUserClaim, TUserRole, TUserLogin>
        , IPermissionStore

        where TUser : IdentityUser<TUserId, TUserClaim, TUserRole, TUserLogin>
        where TUserId : IEquatable<TUserId>

    {
        public PermissionStore(IUnitOfWork context) : base(context)
        {
        }


        public IList<Permission> Find(object userId)
        {
            throw new NotImplementedException();
        }

        public IList<Permission> GetByUser(TUser user)
        {
            throw new NotImplementedException();
        }
    }
}