using System;

namespace Ornament.Identity
{
    public class PermissionManager<TUser, TKey, TRole, TPermission>
        where TUser : IdentityUser<TKey, TRole>
        where TKey : IEquatable<TKey>
        where TRole : IdentityRole<TKey>
        where TPermission : Permission<TRole>


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

        public void SetPermission(object res, Enum enumOperator, TPermission r)
        {
        }
    }
}