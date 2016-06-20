using System;
using System.Collections.Generic;
using Ornament.Domain.Uow;
using Ornament.Identity.Stores;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao
{
    public class PermissionStore<TUser, TKey, TUserClaim, TRole, TUserLogin>
        : Store<Permission, int>
            , IUserPermissionStore<TUser, TKey, TUserClaim, TRole, TUserLogin>
            , IPermissionStore
        where TUser : IdentityUser<TKey, TRole, TUserClaim, TUserLogin>
        where TKey : IEquatable<TKey>
        where TUserClaim : IdentityUserClaim<TKey>
        where TRole : IdentityRole<TKey>
        where TUserLogin : IdentityUserLogin<TKey>


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