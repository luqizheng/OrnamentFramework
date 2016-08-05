﻿using System;
using System.Collections.Generic;
using Ornament.Domain.Uow;
using Ornament.Identity.Stores;
using Ornament.NHibernate;
using Ornament.NHibernate.Uow;

namespace Ornament.Identity.Dao.NhImple
{
    public class PermissionStore<TUser, TKey, TRole>
        : Store<Permission<TRole>, int>
            , IUserPermissionStore<TUser, TKey, TRole>
            , IPermissionStore<TRole>
        where TUser : IdentityUser<TKey, TRole>
        where TKey : IEquatable<TKey>
        where TRole : IdentityRole<TKey>


    {
        public PermissionStore(NhUow context) : base(context)
        {
        }


        public IList<Permission<TRole>> GetByUser(TUser user)
        {
            throw new NotImplementedException();
        }

        public IList<Permission<TRole>> Find(object userId)
        {
            throw new NotImplementedException();
        }
    }
}