using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ornament.Identity
{
    public class PermissionManager<TUser,TUserId,TRole,TRoleId>
        where TUser: IdentityUser<TUserId,TRole,TRoleId>
        where TRole :IdentityRole<TRoleId>
    {
        private readonly TUser _user;

        public PermissionManager(TUser user)
        {
            _user = user;
        }

        public bool HasPermission(object res,Enum enumOperator)
        {
            return true;
        }

        public void SetPermission(object res,Enum enumOperator,TRole r)
        {

        }
        
    }
}
