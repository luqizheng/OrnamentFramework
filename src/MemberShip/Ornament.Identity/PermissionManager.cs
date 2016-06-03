﻿using System;

namespace Ornament.Identity
{
    public class PermissionManager<TUser, TKey, TUserClaim, TUserRole, TUserLogin>
        where TUser : IdentityUser<TKey, TUserClaim, TUserRole, TUserLogin>
        where TKey : IEquatable<TKey>

    {
        private readonly TUser _user;

        public PermissionManager(TUser user)
        {
            _user = user;
        }

        public bool HasPermission(object res, Enum enumOperator)
        {
            return true;
        }

        public void SetPermission(object res, Enum enumOperator, IdentityRole r)
        {
        }
    }
}