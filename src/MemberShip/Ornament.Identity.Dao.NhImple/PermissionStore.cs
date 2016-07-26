using System;
using System.Collections.Generic;
using Ornament.Domain.Uow;
using Ornament.Identity.Stores;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao
{
    public class PermissionStore<TUser, TKey, TRole>
        : Store<Permission, int>
            , IUserPermissionStore<TUser, TKey, TRole>
            , IPermissionStore
        where TUser : IdentityUser<TKey, TRole>
        where TKey : IEquatable<TKey>
       
        where TRole : IdentityRole<TKey>
       


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