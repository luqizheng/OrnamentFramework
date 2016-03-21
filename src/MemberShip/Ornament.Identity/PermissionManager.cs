using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ornament.Identity
{
    public class PermissionManager<TUser,TUserId>
        where TUser: IdentityUser<TUserId>
      
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

        public void SetPermission(object res,Enum enumOperator,IdentityRole r)
        {

        }   
        
    }
}
